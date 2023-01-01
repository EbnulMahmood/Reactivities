import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Main from './Main';
import NavBar from './NavBar';
import { v4 as uuid } from 'uuid';
import { Activity } from '../models/activity';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
}

const drawerWidth = 240;

export enum NavItems {
    Home,
    About,
    Create
};

export default function DrawerAppBar(props: Props) {

    const { activityStore } = useStore();

    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        agent.Activities.list().then(response => {
            let activities: Activity[] = [];
            response.forEach(activity => {
                activity.date = activity.date.split('T')[0];
                activities.push(activity);
            });
            setActivities(activities);
            setLoading(false);
        })
    }, []);

    const handleSelectActivity = (id: string) => {
        setSelectedActivity(activities.find(x => x.id === id));
    };

    const handleCancelSelectActivity = () => {
        setSelectedActivity(undefined);
    };

    const handleFormOpen = (id?: string) => {
        id ? handleSelectActivity(id) : handleCancelSelectActivity();
        setEditMode(true);
    };

    const handleFormClose = () => {
        setEditMode(false);
    };

    const viewForm = (item: string) => {
        const create = NavItems[NavItems.Create];
        if (item === create) {
            handleFormOpen();
        }
    };

    const handleCreateOrEditActivity = (activity: Activity) => {
        setSubmitting(true);
        if (activity.id) {
            agent.Activities.update(activity).then(() => {
                setActivities([...activities.filter(x => x.id !== activity.id), activity]);
                setSelectedActivity(activity);
                setEditMode(false);
                setSubmitting(false);
            })
        } else {
            activity.id = uuid();
            agent.Activities.create(activity).then(() => {
                setActivities([...activities, activity]);
                setSelectedActivity(activity);
                setEditMode(false);
                setSubmitting(false);
            })
        }
    }

    const handleDeleteActivity = (id: string) => {
        setSubmitting(true);
        agent.Activities.delete(id).then(() => {
            setActivities([...activities.filter(x => x.id !== id)]);
            setSubmitting(false);
        })
    }

    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                Reactivities
            </Typography>
            <Divider />
            <NavBar navItems={NavItems} viewForm={viewForm} />
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    if (loading) return <LoadingComponent />

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component="nav">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        Reactivities
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {Object.keys(NavItems)
                            .filter((v) => isNaN(Number(v)))
                            .map((item) => (
                                <Button
                                    onClick={() => viewForm(item)}
                                    key={item}
                                    sx={{ color: '#fff' }}>
                                    {item}
                                </Button>
                            ))}
                    </Box>
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
            <Main
                activities={activities}
                selectedActivity={selectedActivity}
                selectActivity={handleSelectActivity}
                editMode={editMode}
                openForm={handleFormOpen}
                closeForm={handleFormClose}
                createOrEditActivity={handleCreateOrEditActivity}
                deleteActivity={handleDeleteActivity}
                submitting={submitting}
                cancelSelectActivity={handleCancelSelectActivity} />
        </Box>
    );
}