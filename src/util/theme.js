export const appTheme = {
  palette: {
    primary: {
      light: "#768fff",
      main: "#2962ff",
      dark: "#0039cb",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#b6e3ff",
      main: "#82b1ff",
      dark: "#4d82cb",
      contrastText: "#000000",
    },
  },
};

export const loginTheme = {
  grid: {
    maxWidth: 1200,
    minHeight: "100vh",
    borderRadius: 0,
    boxShadow: "none",
    padding: 32,
  },
  root: {
    maxWidth: 420,
    minHeight: "100vh",
    borderRadius: 0,
    boxShadow: "none",
    padding: 32,
  },
  pageTitle: {
    marginTop: 30,
    marginBottom: 30,
    textAlign: "center",
  },
  textField: {
    margin: "10px auto 10px auto",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    padding: 0,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    padding: 0,
  },
  button: {
    width: "100%",
  },
  socialButton: {
    width: "100%",
    marginBottom: "15px",
    "& svg": {
      marginRight: 7,
    },
  },
  cardActionsButton: {
    padding: 0,
    margin: "25px 0",
  },
  optionText: {
    margin: "15px 0",
    textAlign: "center",
    fontSize: 14,
  },
};
