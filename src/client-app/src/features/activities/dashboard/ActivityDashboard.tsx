import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Activity } from "../../../app/models/activity";

interface Props {
    activities: Activity[];
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function ActivityDashboard({ activities }: Props) {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid xs={8}>
                    <Item>
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
                    </Item>
                </Grid>
            </Grid>
        </Box>
    );
}