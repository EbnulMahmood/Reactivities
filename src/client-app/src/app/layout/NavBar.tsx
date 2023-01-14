import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { NavItems } from './DrawerAppBar';
import { Link } from 'react-router-dom';

interface Props {
    navItems: typeof NavItems;
    getLink: (item: string) => string;
}

export default function NavBar({ navItems, getLink }: Props) {
    const navItemsKeys = Object.keys(navItems).filter((v) => isNaN(Number(v)));
    return (
        <List>
            {navItemsKeys.map((item) => (
                <ListItem key={item} disablePadding>
                    <ListItemText primary={
                        <Link
                            to={getLink(item)}
                            style={{
                                textDecoration: 'none',
                                color: 'black',
                                margin: '0.5rem'
                            }}
                        >
                            {item}
                        </Link>
                    } />
                </ListItem>
            ))}
        </List>
    );
}