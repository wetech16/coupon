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

export const scream__theme = {
  time: {
    minWidth: 100,
    marginLeft: "12px",
  },

  body: {
    marginLeft: 12,
    minWidth: 180,
  },
};

export const global__theme = {
  palette: {
    primary: {
      main: "#441e51",
      contrastText: "#fff",
    },
    secondary: {
      main: "#e4056f",
      contrastText: "#fff",
    },
  },
  typography: {
    useNextVariant: true,
  },
  invisibleSeparator: {
    border: "none",
    margin: 4,
  },
  visibleSeparator: {
    width: "100%",
    borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
    marginBottom: 20,
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

export const scream__skeleton__theme = {
  card: {
    display: "flex",
    marginBottom: 20,
  },
  cardContent: {
    width: "100%",
    flexDirection: "column",
    padding: 25,
  },
  cover: {
    minWidth: 200,
    objectFit: "cover",
  },
  handle: {
    width: 60,
    height: 18,
    backgroundColor: global__theme.palette.primary.main,
    marginBottom: 7,
  },
  date: {
    height: 14,
    width: 100,
    backgroundColor: "rgba(0,0,0, 0.3)",
    marginBottom: 10,
  },
  fullLine: {
    height: 15,
    width: "90%",
    backgroundColor: "rgba(0,0,0, 0.6)",
    marginBottom: 10,
  },
  halfLine: {
    height: 15,
    width: "50%",
    backgroundColor: "rgba(0,0,0, 0.6)",
    marginBottom: 10,
  },
};

export const post__scream__theme = {
  submitButton: {
    position: "relative",
    float: "right",
    marginTop: 10,
  },
  progressSpinner: {
    position: "absolute",
  },
  closeButton: {
    position: "absolute",
    left: "91%",
    top: "6%",
  },
};

export const scream__dialog__theme = {
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: "50%",
    // objectFit: 'cover'
  },
  dialogContent: {
    padding: 20,
  },
  closeButton: {
    position: "absolute",
    left: "90%",
  },
  expandButton: {
    position: "absolute",
    left: "50%",
    top: "10%",
  },
  spinnerDiv: {
    textAlign: "center",
    marginTop: 50,
    marginBottom: 50,
  },
};

export const comments__theme = {
  commentImage: {
    maxWidth: "100%",
    height: "100px",
    objectFit: "cover",
    borderRadius: "50%",
  },
  commentData: {
    marginLeft: 20,
  },
};

export const profile__theme = {
  paper: {
    padding: 20,
  },
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "80%",
        left: "70%",
      },
    },
    "& .profile-image": {
      width: 200,
      height: 200,
      // objectFit: 'cover',
      maxWidth: "100%",
      borderRadius: "50%",
    },
    "& .profile-details": {
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle",
      },
      "& a": {
        color: "#441e51",
        fontWeight: "bold",
      },
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0",
    },
    "& svg.button": {
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px",
    },
  },
};
