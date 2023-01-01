import { makeObservable, observable } from "mobx";

export default class ActivityStore {
    readonly title = 'hello form mobx!';

    constructor() {
        makeObservable(this, {
            title: observable,
        })
    }
}