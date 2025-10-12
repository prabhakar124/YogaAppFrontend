"use client"
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Image from "next/image";
import Logo from "../../../public/Logo.png";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import { useRouter } from 'next/navigation';

// Import auth components
import { useAuth } from '../hooks/useAuth';
import AuthModal from './AuthModal';

interface Props {
    window?: () => Window;
}

const drawerWidth = 240;
const navItems = ['Home', 'Blog', 'Membership', 'About', 'Contact'];

export default function Navbar(props: Props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [showAuthModal, setShowAuthModal] = React.useState(false);
    const [authView, setAuthView] = React.useState<"signin" | "signup">("signin");
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const router = useRouter();

    // Get auth state
    const { user, loading, signout } = useAuth();

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleSignOut = async () => {
        handleCloseUserMenu();
        await signout();
    };

    const handleOpenAuth = (view: "signin" | "signup") => {
        setAuthView(view);
        setShowAuthModal(true);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Box sx={{ my: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Image src={Logo} alt="Logo" width={40} height={40} />
                <Typography variant="h6" sx={{ ml: 1 }}>
                    Yog Kulam
                </Typography>
            </Box>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText primary={item} />
                        </ListItemButton>
                    </ListItem>
                ))}
                <Divider sx={{ my: 1 }} />
                {!loading && (
                    user ? (
                        <>
                            <ListItem disablePadding>
                                <ListItemButton sx={{ textAlign: 'center' }}>
                                    <ListItemText primary={user.name || user.email} />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton sx={{ textAlign: 'center' }} onClick={handleSignOut}>
                                    <ListItemText primary="Logout" />
                                </ListItemButton>
                            </ListItem>
                        </>
                    ) : (
                        <>
                            <ListItem disablePadding>
                                <ListItemButton sx={{ textAlign: 'center' }} onClick={() => handleOpenAuth("signin")}>
                                    <ListItemText primary="Login" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton sx={{ textAlign: 'center' }} onClick={() => handleOpenAuth("signup")}>
                                    <ListItemText primary="Signup" />
                                </ListItemButton>
                            </ListItem>
                        </>
                    )
                )}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar component="nav" color='default' sx={{ bgcolor: '#284258ff' }}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' }, color: '#cbc5c5ff' }}
                        >
                            <MenuIcon />
                        </IconButton>

                        {/* Logo */}
                        <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
                            <Image src={Logo} alt="Logo" width={56} height={56} />
                            <Typography
                                variant="h6"
                                sx={{
                                    ml: 1,
                                    color: "#cbc5c5ff",
                                    display: { xs: "none", sm: "block" },
                                    fontWeight: 600
                                }}
                            >
                                Yog Kulam
                            </Typography>
                        </Box>

                        {/* Spacer */}
                        <Box sx={{ flexGrow: 1 }} />

                        {/* Desktop Navigation */}
                        <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 1 }}>
                            {navItems.map((item) => (
                                <Button
                                    key={item}
                                    onClick={() => item === 'Blog' ? router.push('/blog') : null}
                                    sx={{
                                        color: '#cbc5c5ff',
                                        '&:hover': {
                                            bgcolor: 'rgba(255, 255, 255, 0.1)'
                                        }
                                    }}
                                >
                                    {item}
                                </Button>
                            ))}

                            {/* Auth Buttons/User Menu */}
                            {loading ? (
                                <Box sx={{ width: 100, height: 36, bgcolor: 'rgba(255, 255, 255, 0.1)', borderRadius: 1 }} />
                            ) : user ? (
                                // User Menu
                                <Box sx={{ ml: 2 }}>
                                    <Tooltip title="Account settings">
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <Avatar
                                                sx={{
                                                    bgcolor: '#ff6b35',
                                                    width: 40,
                                                    height: 40
                                                }}
                                            >
                                                {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                                            </Avatar>
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{ mt: '45px' }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        <MenuItem disabled>
                                            <Box>
                                                <Typography variant="subtitle2" fontWeight={600}>
                                                    {user.name || 'User'}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    {user.email}
                                                </Typography>
                                            </Box>
                                        </MenuItem>
                                        <Divider />
                                        <MenuItem onClick={handleCloseUserMenu}>
                                            <PersonIcon sx={{ mr: 1 }} fontSize="small" />
                                            <Typography>My Profile</Typography>
                                        </MenuItem>
                                        <MenuItem onClick={handleSignOut}>
                                            <LogoutIcon sx={{ mr: 1 }} fontSize="small" />
                                            <Typography>Logout</Typography>
                                        </MenuItem>
                                    </Menu>
                                </Box>
                            ) : (
                                // Login/Signup Buttons
                                <Box sx={{ display: 'flex', gap: 1, ml: 2 }}>
                                    <Button
                                        variant="outlined"
                                        onClick={() => handleOpenAuth("signin")}
                                        startIcon={<LoginIcon />}
                                        sx={{
                                            color: '#cbc5c5ff',
                                            borderColor: '#cbc5c5ff',
                                            '&:hover': {
                                                borderColor: '#fff',
                                                bgcolor: 'rgba(255, 255, 255, 0.1)'
                                            }
                                        }}
                                    >
                                        Login
                                    </Button>
                                    <Button
                                        variant="contained"
                                        onClick={() => handleOpenAuth("signup")}
                                        sx={{
                                            bgcolor: '#ff6b35',
                                            '&:hover': {
                                                bgcolor: '#ff5722'
                                            }
                                        }}
                                    >
                                        Signup
                                    </Button>
                                </Box>
                            )}
                        </Box>
                    </Toolbar>
                </AppBar>

                {/* Mobile Drawer */}
                <nav>
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true,
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>
                </nav>
            </Box>

            {/* Auth Modal */}
            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                defaultView={authView}
            />
        </>
    );
}