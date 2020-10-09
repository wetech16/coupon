import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_USER,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  MARK_NOTIFICATIONS_READ,
  STOP_LOADING_USER,
} from "../types";
import { db, firebase } from "../../util/db";
import validateSignupData from "../../util/validator";

// get user details actions
export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER });
};

export const loginUser = (email, password, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((token) => {
      localStorage.setItem("FBIdToken", `Bear ${token}`);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: { general: err.message },
      });
    });
};

export const signupUser = (email, password, handle, history) => (
  dispatch
) => {
  dispatch({ type: LOADING_UI });
  const newUser = {
    email: email,
    password: password,
    handle: handle,
  };

  const { errors, valid } = validateSignupData(newUser);
  let token, userId;
  valid
    ? db
        .doc(`/users/${handle}`)
        .get()
        .then((doc) => {
          if (doc.exists) {
            dispatch({
              type: SET_ERRORS,
              payload: { general: "user name is already taken" },
            });
          } else {
            // sign up auth
            return firebase
              .auth()
              .createUserWithEmailAndPassword(email, password);
          }
        })
        .then((data) => {
          dispatch({
            type: SET_ERRORS,
            payload: { general: "Sign up successfully" },
          });
          userId = data.user.uid;
          return data.user.getIdToken();
        })
        // create user doc in user collection
        .then((idtoken) => {
          token = idtoken;
          const userCredentials = {
            handle: handle,
            email: email,
            createdAt: new Date().toISOString(),
            userId,
          };
          //create collection with the set Id document
          return db.doc(`/users/${handle}`).set(userCredentials);
        })
        .then(() => {
          var user = firebase.auth().currentUser;
          return user.sendEmailVerification();
        })
        .then(() => {
          localStorage.setItem("FBIdToken", `Bear ${token}`);
          dispatch(getUserData());
          dispatch({ type: CLEAR_ERRORS });
          history.push("/");
        })
        .catch((err) => {
          if (err.code) {
            dispatch({
              type: SET_ERRORS,
              payload: { general: err.message },
            });
          } else {
            dispatch({
              type: SET_ERRORS,
              payload: { general: "The name/email is already taken" },
            });
          }
        })
    : dispatch({
        type: SET_ERRORS,
        payload: errors,
      });
};

// logout action
export const logOutUser = () => (dispatch) => {
  localStorage.removeItem("FBIdToken");
  dispatch({ type: SET_UNAUTHENTICATED });
};
