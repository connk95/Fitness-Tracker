import { ThemeOptions } from "@mui/material/styles";

export const theme: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#e43d12",
    },
    secondary: {
      main: "#ffa2b6",
      dark: "#d6536d",
    },
    background: {
      default: "#ebe9e1",
    },
    text: {
      primary: "#e43d12",
    },
    error: {
      main: "#efb11d",
    },
  },
  typography: {
    fontFamily: ' "Arial", sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    button: {
      fontSize: 16,
      fontWeight: 700,
      textTransform: "none",
      marginRight: "1rem",
      borderRadius: 0,
    },
    // textField: {
    //   borderRadius: 0,
    // },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "#ebe9e1",
        },
      },
    },
    // MuiTypography: {
    //   styleOverrides: {
    //     h6: {
    //       color: "#ebe9e1",
    //     },
    //   },
    // },
    MuiGrid: {
      styleOverrides: {
        item: {
          paddingLeft: 0,
          // You can override other paddings as needed
        },
      },
    },
  },
};
