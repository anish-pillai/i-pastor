import { Box, Drawer } from '@mui/material';
import { Chat, Language, Upload } from '@mui/icons-material';
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './context/UserContext';
import DrawerContent from './components/DrawerContent';

const DRAWER_WIDTH = 280;
const COLLAPSED_DRAWER_WIDTH = 70;

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(true);
  const navigate = useNavigate();
  const { user } = useUser();

  const menuItems = [
    { text: 'Chat', icon: <Chat />, path: '/' },
    { text: 'Document Upload', icon: <Upload />, path: '/upload' },
    { text: 'Web Search', icon: <Language />, path: '/web-search' },
  ];

  const handleDrawerToggle = useCallback(() => {
    setDrawerOpen((prev) => !prev);
  }, []);

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Box
        component='nav'
        sx={{
          width: { sm: drawerOpen ? DRAWER_WIDTH : COLLAPSED_DRAWER_WIDTH },
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
          <DrawerContent
            menuItems={menuItems}
            navigate={navigate}
            setMobileOpen={setMobileOpen}
            user={user}
            drawerOpen={drawerOpen}
            handleDrawerToggle={handleDrawerToggle}
          />
        </Drawer>
        <Drawer
          variant='permanent'
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerOpen ? DRAWER_WIDTH : COLLAPSED_DRAWER_WIDTH,
              borderRadius: '0 10px 10px 0',
            },
          }}
          open
        >
          <DrawerContent
            menuItems={menuItems}
            navigate={navigate}
            setMobileOpen={setMobileOpen}
            user={user}
            drawerOpen={drawerOpen}
            handleDrawerToggle={handleDrawerToggle}
          />
        </Drawer>
      </Box>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: 3,
          width: {
            sm: `calc(100% - ${
              drawerOpen ? DRAWER_WIDTH : COLLAPSED_DRAWER_WIDTH
            }px)`,
          },
          ml: {
            sm: drawerOpen
              ? `${DRAWER_WIDTH}px`
              : `${COLLAPSED_DRAWER_WIDTH}px`,
          },
          mt: 8,
          overflow: 'auto',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
