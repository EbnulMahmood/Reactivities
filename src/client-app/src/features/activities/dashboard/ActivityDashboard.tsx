import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default observer(function ActivityDashboard() {

    const { activityStore: { selectedActivity, editMode } } = useStore();

    return (
        <Container sx={{ p: 3 }}>
            <Toolbar />
            <Grid container spacing={2}>
                <Grid item={true} xs={12} sm={6} md={8}>
                    <Item>
                        <ActivityList />
                    </Item>
                </Grid>
                <Grid item={true} xs={12} sm={6} md={4}>
                    <Item>
                        {selectedActivity && !editMode &&
                            <ActivityDetails />}
                        {editMode && <ActivityForm />}
                    </Item>
                </Grid>
            </Grid>
        </Container>
    );
});