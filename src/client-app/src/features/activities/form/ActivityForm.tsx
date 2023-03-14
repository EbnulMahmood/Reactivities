import React, { ChangeEvent, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import LoadingButton from '@mui/lab/LoadingButton';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";

export default observer(function ActivityForm() {

    const { activityStore: { loading, createActivity, updateActivity, loadActivity, loadingInitial } } = useStore();
    const {id} = useParams<{id: string}>();

    const [activity, setActivity] = useState({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    });

    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(activity!))
        else setActivity({
            id: '',
            title: '',
            category: '',
            description: '',
            date: '',
            city: '',
            venue: ''
        });
    }, [id, loadActivity])

    const handleSubmit = () => {
        activity.id ? updateActivity(activity) : createActivity(activity);
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value });
    }

    const [date, setDate] = React.useState<Dayjs | null>(
        activity.date === '' ? dayjs(new Date()) : dayjs(activity.date)
    );

    if (loadingInitial) return <LoadingComponent />

    return (
        <Box
            onSubmit={handleSubmit}
            component="form"
            sx={{
                '& > :not(style)': { p: 1 },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField
                value={activity.title}
                name='title'
                onChange={handleInputChange}
                fullWidth
                id="title"
                label="Title"
                variant="outlined" />
            <TextField
                value={activity.description}
                name='description'
                onChange={handleInputChange}
                multiline
                rows={4}
                fullWidth
                id="description"
                label="Description"
                variant="outlined" />
            <TextField
                value={activity.category}
                name='category'
                onChange={handleInputChange}
                fullWidth
                id="category"
                label="Category"
                variant="outlined" />
            <LocalizationProvider
                dateAdapter={AdapterDayjs}
            >
                <DateTimePicker
                    renderInput={(props) =>
                        <TextField
                            {...props}
                            fullWidth
                            name='date'
                            id="date"
                            variant="outlined"
                            onChange={handleInputChange}
                        />}
                    label="Date"
                    value={date}
                    onChange={(newValue) => {
                        setDate(newValue);
                    }}
                />
            </LocalizationProvider>
            <TextField
                value={activity.city}
                name='city'
                onChange={handleInputChange}
                fullWidth
                id="city"
                label="City"
                variant="outlined" />
            <TextField
                value={activity.venue}
                name='venue'
                onChange={handleInputChange}
                fullWidth
                id="venue"
                label="Venue"
                variant="outlined" />
            <Box display="flex" justifyContent="space-between">
                <LoadingButton
                    size="small"
                    color="warning"
                    loadingPosition="start"
                    startIcon={<CancelIcon />}
                    variant="outlined"
                >
                    Cancel
                </LoadingButton>
                <LoadingButton
                    loading={loading}
                    size="small"
                    color="success"
                    loadingPosition="start"
                    startIcon={<SaveIcon />}
                    variant="outlined"
                >
                    Save
                </LoadingButton>
            </Box>
        </Box>
    );
});