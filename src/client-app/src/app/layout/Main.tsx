import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import axios from 'axios';
import { Activity } from '../models/activity';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

export default function Main() {

    const [activities, setActivities] = useState<Activity[]>([]);

    useEffect(() => {
        axios.get<Activity[]>('http://localhost:5032/api/activity').then(response => {
            setActivities(response.data);
        })
    }, []);

    return (
        <Box component="main" sx={{ p: 3 }}>
            <Toolbar />
            <ActivityDashboard activities={activities} />
        </Box>
    );
}