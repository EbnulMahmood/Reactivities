import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import axios from 'axios';
import { Activity } from '../models/activity';

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
            <List
                sx={{
                    width: '100%',
                    bgcolor: 'background.paper',
                    position: 'relative',
                    overflow: 'auto',
                    '& ul': { padding: 0 },
                }}
            >
                {activities.map(activity => (
                    <ListItem key={activity.id}>
                        <ListItemText primary={activity.title} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}