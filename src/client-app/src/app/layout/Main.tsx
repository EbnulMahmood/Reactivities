import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import { Activity } from '../models/activity';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import Container from '@mui/material/Container';

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEditActivity: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
    submitting: boolean;
}

export default function Main({ activities, selectedActivity, selectActivity,
    cancelSelectActivity, editMode, openForm,
    closeForm, createOrEditActivity, deleteActivity,
    submitting }: Props) {
    return (
        <Container sx={{ p: 3 }}>
            <Toolbar />
            <ActivityDashboard
                activities={activities}
                selectedActivity={selectedActivity}
                selectActivity={selectActivity}
                editMode={editMode}
                openForm={openForm}
                closeForm={closeForm}
                createOrEditActivity={createOrEditActivity}
                deleteActivity={deleteActivity}
                submitting={submitting}
                cancelSelectActivity={cancelSelectActivity} />
        </Container>
    );
}