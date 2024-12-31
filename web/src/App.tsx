import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { lightTheme, darkTheme } from './theme/theme';
import { useThemeStore } from './store/themeStore';
import Layout from './Layout';
import AppRoutes from './routes';
import { UserProvider } from './context/UserContext';
import { ChatProvider } from './context/ChatContext';

function App() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <UserProvider>
          <ChatProvider>
            <Layout>
              <AppRoutes />
            </Layout>
          </ChatProvider>
        </UserProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
