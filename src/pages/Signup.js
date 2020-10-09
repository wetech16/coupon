import React from "react";
import clsx from "clsx";
//Mui
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import CircularProgress from "@material-ui/core/CircularProgress";
import BrandLogo from "../assets/svg/logo/BrandLogo";
import GoogleLogo from "../assets/svg/logo/GoogleLogo";
import FacebookLogo from "../assets/svg/logo/FacebookLogo";
//Hooks
import useSignupBtn from "../hooks/useSignupBtn";
import googleSignin from "../hooks/googleSignin";
import facebookSignin from "../hooks/facebookSignin";
import useSignup from "../hooks/useSignup";
//Redux
import { connect } from "react-redux";
import { signupUser } from "../redux/actions/userActions";

const useStyles = makeStyles(() => ({
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
}));

function Signup(props) {
  const {
    signupUser,
    UI: { loading, errors },
  } = props;
  const classes = useStyles();
  const [
    email,
    password,
    name,
    handleEmail,
    handlePassword,
    handleName,
    passwordStr,
    showPassword,
    setShowpassword,
  ] = useSignupBtn();

  return (
    <Card className={classes.root} mx="auto">
      <form
        noValidate
        className={classes.form}
        onSubmit={(e) => {
          e.preventDefault();
          signupUser(email, password, name, props.history);
        }}
      >
        <CardContent className={classes.card}>
          <BrandLogo />

          <Typography variant="h4" className={classes.pageTitle}>
            Get Started
          </Typography>

          <div>
            <Button
              variant="outlined"
              className={classes.socialButton}
              onClick={googleSignin}
            >
              <GoogleLogo /> Sign in with Google
            </Button>
            <Button
              variant="outlined"
              className={classes.socialButton}
              onClick={facebookSignin}
            >
              <FacebookLogo /> Sign in with Facebook
            </Button>
          </div>

          <div>
            <Typography
              variant="body1"
              className={classes.optionText}
            >
              Or sign up with email
            </Typography>
          </div>

          <div>
            <TextField
              id="handle"
              name="handle"
              type="text"
              label="First and last name"
              className={classes.textField}
              helperText={errors.handle}
              error={errors.handle ? true : false}
              value={name}
              variant="outlined"
              onChange={handleName}
              fullWidth
            />

            <TextField
              id="email"
              name="email"
              type="email"
              label="Email Address"
              variant="outlined"
              className={classes.textField}
              helperText={errors.email}
              error={errors.email ? true : false}
              value={email}
              onChange={handleEmail}
              fullWidth
            />

            <FormControl
              className={clsx(classes.margin, classes.textField)}
              variant="outlined"
              fullWidth
            >
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePassword}
                error={errors.password ? true : false}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => {
                        setShowpassword(!showPassword);
                      }}
                      onMouseDown={(event) => {
                        event.preventDefault();
                      }}
                      edge="end"
                    >
                      {showPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
              <FormHelperText id="outlined-weight-helper-text">
                {errors.password ? errors.password : ""}{" "}
              </FormHelperText>
              <div className={`password-strenth-bars ${passwordStr}`}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </FormControl>
            {errors.general && (
              <Typography
                variant="body2"
                className={classes.customeError}
              >
                {errors.general}
              </Typography>
            )}
          </div>
        </CardContent>

        <CardActions className={classes.cardActionsButton}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={loading}
          >
            Create Account
            {loading && (
              <CircularProgress
                className={classes.progress}
                size={30}
              />
            )}
          </Button>
        </CardActions>
      </form>
    </Card>
  );
}

// Pull state from Redux Store To Component
const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

// Push Actions To Props
const mapActionsToProps = {
  signupUser,
};

export default connect(mapStateToProps, mapActionsToProps)(Signup);
