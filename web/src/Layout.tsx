import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Menu as MenuIcon,
  DarkMode,
  LightMode,
  Chat,
  Upload,
  Language,
} from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useThemeStore } from './store/themeStore';

const DRAWER_WIDTH = 280;

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(true); // New state for drawer open/close
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useThemeStore();

  const menuItems = [
    { text: 'Chat', icon: <Chat />, path: '/' },
    { text: 'Document Upload', icon: <Upload />, path: '/upload' },
    { text: 'Web Search', icon: <Language />, path: '/web-search' },
  ];

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen); // Toggle drawer open/close state
  };

  const drawer = (
    <Box>
      <Toolbar />
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            component='li'
            onClick={() => {
              navigate(item.path);
              setMobileOpen(false);
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <AppBar position='fixed'>
        <Toolbar>
          <IconButton
            color='inherit'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap component='div' sx={{ flexGrow: 1 }}>
            iPastor
          </Typography>
          <IconButton color='inherit' onClick={toggleTheme}>
            {isDarkMode ? <LightMode /> : <DarkMode />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component='nav'
        sx={{
          width: { sm: drawerOpen ? DRAWER_WIDTH : 0 },
          flexShrink: { sm: 0 },
          mt: 8, // Add margin top to place drawer below AppBar
          position: 'fixed', // Fix the drawer position
          top: 64, // Adjust top position to be below AppBar
        }}
      >
        <Drawer
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant='permanent'
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerOpen ? DRAWER_WIDTH : 0,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerOpen ? DRAWER_WIDTH : 0}px)` },
          ml: { sm: drawerOpen ? `${DRAWER_WIDTH}px` : 0 },
          mt: 8,
          overflow: 'auto', // Ensure content is scrollable within the main area
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
