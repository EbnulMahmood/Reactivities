import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";
import { v4 as uuid } from 'uuid';

export default class ActivityStore {
    private readonly _activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor() {
        makeAutoObservable(this)
    }

    get activitiesByDate() {
        return Array.from(this._activityRegistry.values()).sort((a, b) =>
            Date.parse(a.date) - Date.parse(b.date));
    }

    loadActivities = async () => {
        this.loadingInitial = true;
        try {
            const activities = await agent.Activities.list();
            runInAction(() => {
                activities.forEach(activity => {
                    this.setActivity(activity);
                });
                this.loadingInitial = false;
            });
        } catch (error) {
            runInAction(() => {
                this.loadingInitial = false;
            });
            console.log(error);
        }
    };

    loadActivity = async (id:string) => {
        let activity = await this.getActivity(id);
        if (activity) {
            this.selectedActivity = activity;
        } else {
            this.loadingInitial = true;
            try {
                activity = await agent.Activities.details(id);
                this.setActivity(activity);
                this.selectedActivity = activity;
                this.loadingInitial = false;
            } catch (error) {
                console.log(error);
                this.loadingInitial = false;
            }
        }
    }

    private setActivity = (activity: Activity) => {
        activity.date = activity.date.split('T')[0];
        this._activityRegistry.set(activity.id, activity);
    }

    private getActivity = async (id:string) => {
        return this._activityRegistry.get(id);
    }

    createActivity = async (activity: Activity) => {
        this.loading = true;
        activity.id = uuid();
        try {
            await agent.Activities.create(activity)
            runInAction(() => {
                this._activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            });
        } catch (error) {
            runInAction(() => {
                this.loading = false;
            });
            console.log(error);
        }
    }

    updateActivity = async (activity: Activity) => {
        this.loading = true;
        try {
            await agent.Activities.update(activity)
            runInAction(() => {
                this._activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            });
        } catch (error) {
            runInAction(() => {
                this.loading = false;
            });
            console.log(error);
        }
    }

    deleteActivity = async (id: string) => {
        this.loading = true;
        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                this._activityRegistry.delete(id);
                this.loading = false;
            });
        } catch (error) {
            runInAction(() => {
                this.loading = false;
            });
            console.log(error);
        }
    }
}