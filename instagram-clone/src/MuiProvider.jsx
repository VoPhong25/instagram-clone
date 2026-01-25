import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const muiTheme = createTheme({
  palette: {
    mode: "light",
  },
});

export default function MuiProvider({ children }) {
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
