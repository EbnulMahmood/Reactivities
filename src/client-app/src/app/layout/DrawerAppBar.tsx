import React from 'react';
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
import NavBar from './NavBar';
import { useStore } from '../stores/store';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import Container from '@mui/material/Container';

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

export default observer(function DrawerAppBar(props: Props) {

    const { activityStore: { openForm } } = useStore();

    const viewForm = (item: string) => {
        const create = NavItems[NavItems.Create];
        if (item === create) {
            openForm();
        }
    };

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
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='*' element={
                    <Routes>
                        <Route path='/activities' element={<ActivityDashboard />} />
                        <Route path='/createActivity' element={
                            <Container sx={{
                                marginTop: '7rem',
                                width: '30rem'
                            }}>
                                <ActivityForm />
                            </Container>
                        } />
                    </Routes>
                } />
            </Routes>
        </Box>
    );
});