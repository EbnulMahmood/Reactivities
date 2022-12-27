import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Activity } from "../../../app/models/activity";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

interface Props {
    activities: Activity[];
    selectActivity: (id: string) => void;
}

export default function ActivityList({ activities, selectActivity }: Props) {
    return (
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
                <>
                    <ListItem key={activity.id} alignItems="flex-start"
                        secondaryAction={
                            <IconButton
                                edge="end"
                                size="small"
                                aria-label="view"
                                onClick={() => selectActivity(activity.id)}
                            >
                                <RemoveRedEyeIcon />
                            </IconButton>
                        }>
                        <ListItemText
                            primary={<Typography
                                sx={{ display: 'inline' }}
                                variant="h6"
                                component="div">
                                {activity.title}
                            </Typography>}
                            secondary={
                                <>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary">
                                        {activity.date}
                                    </Typography>
                                    <Divider></Divider>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        Ali Connors
                                    </Typography>
                                    {" —"} {activity.description}
                                </>
                            }
                        />
                    </ListItem>
                    <Divider variant="fullWidth" component="li" />
                </>
            ))}
        </List>
    );
}