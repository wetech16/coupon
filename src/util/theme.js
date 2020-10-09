export const appTheme = {
  palette: {
    primary: {
      light: "#ff9e40",
      main: "#ff6d00",
      dark: "#c43c00",
      contrastText: "#000000",
    },
    secondary: {
      light: "#ffdd71",
      main: "#ffab40",
      dark: "#c77c02",
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
    position: "relative",
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
    display: "flex",
    flexDirection: "column",
    padding: 0,
    margin: "25px 0",
  },
  optionText: {
    margin: "15px 0",
    textAlign: "center",
    fontSize: 14,
  },
  progress: {
    position: "absolute",
  },
};
