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
} from '@mui/material';
import { ReactNode } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { Menu as MenuIcon, DarkMode, LightMode } from '@mui/icons-material';
import { useThemeStore } from '../store/themeStore';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
interface MenuItem {
  text: string;
  icon: ReactNode;
  path: string;
}

interface DrawerContentProps {
  menuItems: MenuItem[];
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
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
        <Avatar src={user?.profilePic} alt={user?.name} />
        {drawerOpen && (
          <Box sx={{ ml: 2 }}>
            <Typography variant='body2'>Logged in as:</Typography>
            <Typography variant='h6'>{user?.name}</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default DrawerContent;
