import { createTheme } from '@mui/material/styles';
import colors from './colors';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: colors.primary,
      contrastText: '#000000', // Black text for primary color
    },
    secondary: {
      main: colors.secondary,
      contrastText: '#000000', // Black text for secondary color
    },
    background: {
      default: '#ffffff', // White background for a clean look
      paper: '#f5f5f5', // Light grey background for paper components
    },
    text: {
      primary: '#000000', // Black text for primary content
      secondary: '#333333', // Dark grey text for secondary content
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        code {
          color: #000000;
        }
      `,
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: colors.primary,
      contrastText: '#ffffff', // White text for primary color
    },
    secondary: {
      main: colors.secondary,
      contrastText: '#ffffff', // White text for secondary color
    },
    background: {
      default: '#333333', // Dark grey background for a modern look
      paper: '#424242', // Dark background for paper components
    },
    text: {
      primary: '#ffffff', // White text for primary content
      secondary: '#aaaaaa', // Light grey text for secondary content
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        code {
          color: #ffffff;
        }
      `,
    },
  },
});

export { lightTheme, darkTheme };
