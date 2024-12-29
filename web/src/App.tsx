import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { lightTheme, darkTheme } from './theme/theme';
import { useThemeStore } from './store/themeStore';
import Layout from './Layout';
import AppRoutes from './routes';
import { UserProvider } from './context/UserContext';

function App() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <UserProvider>
          <Layout>
            <AppRoutes />
          </Layout>
        </UserProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
