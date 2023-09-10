
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';

// Create a custom Material-UI theme
let  mainTheme = createTheme({
palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
    typography: {
        fontFamily: 'Roboto, sans-serif', // Customize your typography
    },
    // Add more customizations here...
});



export default mainTheme;
