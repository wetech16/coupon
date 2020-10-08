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
import { firebase } from "../../util/db";

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
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: { general: err.message },
      });
    });
};
