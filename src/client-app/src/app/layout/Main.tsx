import React, { useEffect, useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import axios from 'axios';
import { Activity } from '../models/activity';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import Container from '@mui/material/Container';

export default function Main() {

    const [activities, setActivities] = useState<Activity[]>([]);

    useEffect(() => {
        axios.get<Activity[]>('http://localhost:5032/api/activity').then(response => {
            setActivities(response.data);
        })
    }, []);

    return (
        <Container sx={{ p: 3 }}>
            <Toolbar />
            <ActivityDashboard activities={activities} />
        </Container>
    );
}