import {
  Box,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import { ReactNode, useState } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { DarkMode, LightMode } from '@mui/icons-material';
import { useThemeStore } from '../store/themeStore';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { useAuth } from '../context/AuthContext';
interface MenuItemProps {
  text: string;
  icon: ReactNode;
  path: string;
}

interface DrawerContentProps {
  menuItems: MenuItemProps[];
  navigate: NavigateFunction;
  setMobileOpen: (open: boolean) => void;
  user: { name: string; profilePic: string } | null;
  drawerOpen: boolean;
  handleDrawerToggle: () => void;
}

const DrawerContent = ({
  menuItems,
  navigate,
  setMobileOpen,
  user,
  drawerOpen,
  handleDrawerToggle,
}: DrawerContentProps) => {
  const { isDarkMode, toggleTheme } = useThemeStore();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { logout } = useAuth();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    navigate('/profile');
    handleClose();
  };

  const handleLogout = () => {
    // Add your logout logic here
    logout();
    handleClose();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Toolbar>
        <IconButton color='inherit' edge='start' onClick={handleDrawerToggle}>
          <MenuOpenIcon />
        </IconButton>
        {drawerOpen && (
          <Typography variant='h6' noWrap component='div' sx={{ ml: 1 }}>
            iPastor
          </Typography>
        )}
      </Toolbar>
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            component='li'
            onClick={() => {
              navigate(item.path);
              setMobileOpen(false);
            }}
            sx={{ cursor: 'pointer' }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            {drawerOpen && <ListItemText primary={item.text} />}
          </ListItem>
        ))}
      </List>
      <Divider sx={{ mt: 'auto' }} />
      <Box sx={{ p: 2 }}>
        <IconButton color='inherit' onClick={toggleTheme}>
          {isDarkMode ? <LightMode /> : <DarkMode />}
        </IconButton>
      </Box>
      <Box
        sx={{ p: 2, display: 'flex', alignItems: 'center', cursor: 'pointer' }}
        onClick={handleClick}
      >
        <Avatar src={user?.profilePic} alt={user?.name} />
        {drawerOpen && (
          <Box sx={{ ml: 2 }}>
            <Typography variant='body2'>Logged in as:</Typography>
            <Typography variant='h6'>{user?.name}</Typography>
          </Box>
        )}
      </Box>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleProfile}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};

export default DrawerContent;
