import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#10a37f',
      light: '#1abc9c',
      dark: '#008c67',
    },
    background: {
      default: '#ffffff',
      paper: '#f7f7f8',
    },
    text: {
      primary: '#2c3e50',
      secondary: '#34495e',
    },
  },
  typography: {
    fontFamily: '"Söhne", "Helvetica Neue", "Arial", sans-serif',
    fontSize: 16,
    h1: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.75,
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#10a37f',
      light: '#1abc9c',
      dark: '#008c67',
    },
    background: {
      default: '#343541',
      paper: '#444654',
    },
    text: {
      primary: '#ececf1',
      secondary: '#d1d5db',
    },
  },
  typography: {
    fontFamily: '"Söhne", "Helvetica Neue", "Arial", sans-serif',
    fontSize: 16,
    h1: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.75,
    },
  },
});