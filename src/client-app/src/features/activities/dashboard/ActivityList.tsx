import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Activity } from "../../../app/models/activity";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
    activities: Activity[];
    selectActivity: (id: string) => void;
    deleteActivity: (id: string) => void;
}

export default function ActivityList({ activities, selectActivity, deleteActivity }: Props) {
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
                <ListItem
                    divider={true}
                    key={activity.id}
                    alignItems="flex-start"
                    secondaryAction={
                        <>
                            <IconButton
                                onClick={() => selectActivity(activity.id)}
                                edge="end"
                                size="small"
                                aria-label="view"
                            >
                                <RemoveRedEyeIcon />
                            </IconButton>
                            <IconButton
                                onClick={() => deleteActivity(activity.id)}
                                edge="end"
                                size="small"
                                aria-label="delete"
                            >
                                <DeleteIcon />
                            </IconButton>
                        </>
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
                                    sx={{ display: 'block' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary">
                                    {activity.date}
                                </Typography>
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
            ))}
        </List>
    );
}