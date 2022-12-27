import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Activity } from "../../../app/models/activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function ActivityDashboard({ activities, selectedActivity, selectActivity, cancelSelectActivity }: Props) {
    return (
        <Grid container spacing={2}>
            <Grid item={true} xs={12} sm={6} md={8}>
                <Item>
                    <ActivityList
                        activities={activities}
                        selectActivity={selectActivity} />
                </Item>
            </Grid>
            <Grid item={true} xs={12} sm={6} md={4}>
                <Item>
                    {selectedActivity &&
                        <ActivityDetails
                            activity={selectedActivity}
                            cancelSelectActivity={cancelSelectActivity} />}
                    <ActivityForm />
                </Item>
            </Grid>
        </Grid>
    );
}