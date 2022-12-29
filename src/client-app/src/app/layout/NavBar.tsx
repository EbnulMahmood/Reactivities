import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { NavItems } from './DrawerAppBar';

interface Props {
    navItems: typeof NavItems;
    viewForm: (item: string) => void;
}

export default function NavBar({ navItems, viewForm }: Props) {
    const navItemsKeys = Object.keys(navItems).filter((v) => isNaN(Number(v)));
    return (
        <List>
            {navItemsKeys.map((item) => (
                <ListItem key={item} disablePadding>
                    <ListItemButton onClick={() => viewForm(item)} sx={{ textAlign: 'center' }}>
                        <ListItemText primary={item} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    );
}