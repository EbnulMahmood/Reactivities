import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import LoadingButton from '@mui/lab/LoadingButton';

export default function ActivityForm() {
    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { p: 1 },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField fullWidth id="title" label="Title" variant="outlined" />
            <TextField
                multiline
                rows={4}
                fullWidth
                id="description"
                label="Description"
                variant="outlined" />
            <TextField fullWidth id="category" label="Category" variant="outlined" />
            <TextField fullWidth id="date" label="Date" variant="outlined" />
            <TextField fullWidth id="city" label="City" variant="outlined" />
            <TextField fullWidth id="venue" label="Venue" variant="outlined" />
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
}