import React from "react";
import "./App.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import jwtDecode from "jwt-decode";
import AuthRoute from "./util/AuthRoute";
//pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/layout/Navbar";
import user from "./pages/user";

//Mui
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import { appTheme } from "./util/theme";
//Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import {
  logOutUser,
  getAuthenticatedUser,
} from "./redux/actions/userActions";

const token = localStorage.getItem("FBIdToken");
if (token) {
  const decodedToken = jwtDecode(token);
  //console.log(decodedToken);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logOutUser());
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    store.dispatch(getAuthenticatedUser());
  }
}

const theme = createMuiTheme(appTheme);
const App = () => {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <AuthRoute exact path="/login" component={Login} />
              <AuthRoute exact path="/signup" component={Signup} />
              <Route exact path="/users/:handle" component={user} />
              <Route
                exact
                path="/users/:handle/scream/:screamId"
                component={user}
              />
            </Switch>
          </div>
        </Router>
      </MuiThemeProvider>
    </Provider>
  );
};

export default App;
