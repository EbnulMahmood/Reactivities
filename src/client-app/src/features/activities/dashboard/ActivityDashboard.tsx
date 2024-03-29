import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import ActivityList from "./ActivityList";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default observer(function ActivityDashboard() {

    const { activityStore: { loadingInitial,
        loadActivities } } = useStore();

    useEffect(() => {
        loadActivities();
    }, [loadActivities]);

    if (loadingInitial) return <LoadingComponent />

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
                        <h2>Activity Filters</h2>
                    </Item>
                </Grid>
            </Grid>
        </Container>
    );
});