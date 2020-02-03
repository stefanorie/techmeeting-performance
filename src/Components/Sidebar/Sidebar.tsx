import React from 'react';
import { Drawer, Divider, List, ListItem, ListItemIcon, ListItemText, makeStyles, Link, Box } from '@material-ui/core';
import WheelchairIcon from '@material-ui/icons/AccessibleForward';
import SpeedIcon from '@material-ui/icons/Speed';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BookIcon from '@material-ui/icons/MenuBook';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import MoneyIcon from '@material-ui/icons/MonetizationOn';
import TimerIcon from '@material-ui/icons/Timer';
import GitHubIcon from '@material-ui/icons/GitHub';
import KeyIcon from '@material-ui/icons/VpnKey';
import StorageIcon from '@material-ui/icons/Storage'
import LinkIcon from '@material-ui/icons/Link';
import { Link as RouterLink, useLocation } from 'react-router-dom';

interface ISidebarItem {
    text: string;
    icon?: JSX.Element;
    href: string;
}

const sidebarWidth = 260;

const useStyles = makeStyles(theme => ({
    root: {
        width: sidebarWidth,
    },
    paper: {
        width: 'inherit',
    }
}));

export default function Sidebar() {
    const classes = useStyles(undefined);
    const location = useLocation().pathname;

    function getExampleMenuItems(): ISidebarItem[] {
        return [
            { text: 'Meten === weten', icon: <TimerIcon />, href: '/examples/chrome-tabs' },
            { text: 'Why did you render?', icon: <GitHubIcon />, href: '/examples/why-did-you-render' },
            { text: 'Sleutels', icon: <KeyIcon />, href: '/examples/keys' },
            { text: 'Kapot veel data', icon: <StorageIcon />, href: '/examples/virtualized' },
            { text: 'Filter chaining', icon: <LinkIcon />, href: '/examples/chaining' }
        ];
    }

    function getSpeedItems(): ISidebarItem[] {
        return [
            { text: 'Rolstoel', icon: <WheelchairIcon />, href: '' },
            { text: 'GT86', icon: <SpeedIcon />, href: '' },
        ];
    }

    function getMenuItems(): ISidebarItem[] {
        return [
            { text: 'Dashboard', icon: <DashboardIcon />, href: '' },
            { text: 'Producten', icon: <BookIcon />, href: '' },
            { text: 'Te koop', icon: <ShoppingCart />, href: '' },
            { text: 'Inkomsten', icon: <MoneyIcon />, href: '' },
        ]
    }

    function renderSidebarItem(item: ISidebarItem) {
        return (
            <Link component={RouterLink} to={item.href} key={item.text} underline='none' color='inherit'>
                <ListItem button selected={item.href === location}>
                    <ListItemIcon><>{item.icon}</></ListItemIcon>
                    <ListItemText primary={item.text} />
                </ListItem>
            </Link>
        );
    }

    return (
        <Drawer variant='permanent' anchor='left' classes={{ root: classes.root, paper: classes.paper }}>
            <Box fontSize={18} fontWeight='bold' textAlign='center' py={3}>
                React Performance <span role='img' aria-label='raket'>🚀</span>
            </Box>

            <Divider />

            <List>
                {getExampleMenuItems().map(renderSidebarItem)}
            </List>

            <Divider />

            {false &&
                <>
                    <List>
                        {getMenuItems().map(renderSidebarItem)}
                    </List>

                    <Divider />

                    <List>
                        {getSpeedItems().map(renderSidebarItem)}
                    </List>
                </>
            }
        </Drawer>
    );
}