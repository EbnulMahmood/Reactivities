import React, { SyntheticEvent, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Activity } from "../../../app/models/activity";
import Typography from "@mui/material/Typography";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';
import LoadingButton from "@mui/lab/LoadingButton";

interface Props {
    activities: Activity[];
    selectActivity: (id: string) => void;
    deleteActivity: (id: string) => void;
    submitting: boolean;
}

export default function ActivityList({ activities, selectActivity, deleteActivity,
    submitting }: Props) {

    const [target, setTarget] = useState('');

    const handleActivityDelete = (e: SyntheticEvent<HTMLButtonElement>, id: string) => {
        setTarget(e.currentTarget.id);
        deleteActivity(id);
    }

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
                            <LoadingButton
                                onClick={() => selectActivity(activity.id)}
                                sx={{ mx: 0.2 }}
                                aria-label="view"
                                color="info"
                                variant="outlined"
                            >
                                {<RemoveRedEyeIcon />}
                            </LoadingButton>
                            <LoadingButton
                                onClick={(e) => handleActivityDelete(e, activity.id)}
                                loading={submitting && target === activity.id}
                                id={activity.id}
                                sx={{ mx: 0.2 }}
                                aria-label="delete"
                                color="warning"
                                variant="outlined"
                            >
                                {<DeleteIcon />}
                            </LoadingButton>
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