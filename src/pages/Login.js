import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import BrandLogo from "../assets/svg/logo/BrandLogo";
import GoogleLogo from "../assets/svg/logo/GoogleLogo";
import FacebookLogo from "../assets/svg/logo/FacebookLogo";
import { Card, CardContent, CardActions } from "@material-ui/core";
import { loginTheme } from "../util/theme";
import useLogin from "../hooks/useLogin";

const useStyles = makeStyles(loginTheme);
const Login = (props) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    email: "",
    password: "",
    loading: false,
    error: {},
    showPassword: false,
  });
  const { errors, loginUser } = useLogin(
    values.email,
    values.password
  );
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true });
    loginUser(values.email, values.password);
    setValues({ ...values, error: errors, loading: false });
  };
  return (
    <Grid container className={classes.grid} mx="auto">
      <Grid item sm />
      <Grid item sm>
        <Card className={classes.root} mx="auto">
          <form
            noValidate
            className={classes.form}
            onSubmit={handleSubmit}
          >
            <CardContent className={classes.card}>
              <BrandLogo />
              <Typography variant="h4" className={classes.pageTitle}>
                Sign In
              </Typography>
              <Button
                variant="outlined"
                className={classes.socialButton}
              >
                <GoogleLogo /> Sign in with Google
              </Button>
              <Button
                variant="outlined"
                className={classes.socialButton}
              >
                <FacebookLogo /> Sign in with Facebook
              </Button>
              <Typography
                variant="body1"
                className={classes.optionText}
              >
                Or sign in with email
              </Typography>

              <TextField
                id="email"
                name="email"
                type="email"
                label="Email Address"
                variant="outlined"
                className={classes.textField}
                value={values.email}
                onChange={handleChange}
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
                  name="password"
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => {
                          setValues({
                            ...values,
                            showPassword: !values.showPassword,
                          });
                        }}
                        onMouseDown={(e) => {
                          e.preventDefault();
                        }}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
              </FormControl>
              {errors.general && (
                <Typography
                  variant="body2"
                  className={classes.customeError}
                >
                  {errors.general}
                </Typography>
              )}
            </CardContent>
            <CardActions className={classes.cardActionsButton}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
                disabled={values.loading}
              >
                Login
                {values.loading && (
                  <CircularProgress
                    className={classes.progress}
                    size={30}
                  />
                )}
              </Button>
              <br />
              <small>
                Don't have an account ? sign up{" "}
                <Link to="/signup">here</Link>
              </small>
            </CardActions>
          </form>
        </Card>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

Login.propTypes = {};

export default Login;
