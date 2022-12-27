import React, { useEffect, useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import axios from 'axios';
import { Activity } from '../models/activity';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import Container from '@mui/material/Container';

export default function Main() {

    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);

    useEffect(() => {
        axios.get<Activity[]>('http://localhost:5032/api/activity').then(response => {
            setActivities(response.data);
        })
    }, []);

    const handleSelectActivity = (id: string) => {
        setSelectedActivity(activities.find(x => x.id === id));
    }

    const handleCancelSelectActivity = () => {
        setSelectedActivity(undefined);
    }

    return (
        <Container sx={{ p: 3 }}>
            <Toolbar />
            <ActivityDashboard
                activities={activities}
                selectActivity={handleSelectActivity}
                selectedActivity={selectedActivity}
                cancelSelectActivity={handleCancelSelectActivity} />
        </Container>
    );
}