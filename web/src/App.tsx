import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { lightTheme, darkTheme } from './theme/theme';
import { useThemeStore } from './store/themeStore';
import Layout from './Layout';
import { AppRoutes } from './routes';
import { ChatProvider } from './context/ChatContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context/AuthContext';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID as string;

function App() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <AuthProvider>
            <ChatProvider>
              <Layout>
                <AppRoutes />
              </Layout>
            </ChatProvider>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
