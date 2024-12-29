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
  Divider,
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
import { useTheme } from '@mui/material/styles';
import { useUser } from './context/UserContext'; // Import useUser

const DRAWER_WIDTH = 280;

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(true);
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useThemeStore();
  const theme = useTheme();
  const { user } = useUser(); // Get user from useUser hook

  const menuItems = [
    { text: 'Chat', icon: <Chat />, path: '/' },
    { text: 'Document Upload', icon: <Upload />, path: '/upload' },
    { text: 'Web Search', icon: <Language />, path: '/web-search' },
  ];

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawer = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
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
      <Divider sx={{ mt: 'auto' }} />
      <Box sx={{ p: 2 }}>
        <Typography variant='body2'>Logged in as:</Typography>
        <Typography variant='h6'>{user?.name}</Typography>{' '}
        {/* Display user name */}
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <AppBar
        position='fixed'
        sx={{
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}
      >
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
          mt: 8,
          position: 'fixed',
          top: 64,
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
          overflow: 'auto',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
