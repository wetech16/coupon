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
import validateSignupData, {
  validateUserDetails,
} from "../../util/validator";

let userHandle;
//getUserData
const getUserData = () => (dispatch) => {
  let userData = {};
  db.doc(`/users/${userHandle}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        userData.credentials = doc.data();
        return db
          .collection("likes")
          .where("userHandle", "==", userHandle)
          .get();
      }
    })
    .then((data) => {
      userData.likes = [];
      data.forEach((doc) => {
        userData.likes.push(doc.data());
      });
      return db
        .collection("notifications")
        .where("recipient", "==", userHandle)
        .orderBy("createdAt", "desc")
        .limit(10)
        .get();
    })
    .then((data) => {
      userData.notifications = [];
      data.forEach((doc) => {
        userData.notifications.push({
          recipient: doc.data().recipient,
          sender: doc.data().sender,
          createdAt: doc.data().createdAt,
          screamId: doc.data().screamId,
          type: doc.data().type,
          read: doc.data().read,
          notificationId: doc.id,
        });
      });
    })
    .then(() => {
      dispatch({ type: SET_USER, payload: userData });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: SET_ERRORS, payload: err });
    });
};
// Get own user details
export const getAuthenticatedUser = () => (dispatch) => {
  dispatch({ type: LOADING_USER });
  //get userhandle

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      return db
        .collection("users")
        .where("userId", "==", user.uid)
        .limit(1)
        .get()
        .then((data) => {
          userHandle = data.docs[0].data().handle;
          dispatch(getUserData());
        })
        .catch((err) => {
          dispatch({
            type: SET_ERRORS,
            payload: { general: err.message },
          });
        });
    }
  });
};

export const loginUser = (email, password, history) => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
  dispatch({ type: LOADING_UI });
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((token) => {
      localStorage.setItem("FBIdToken", `Bear ${token}`);
      dispatch(getAuthenticatedUser());
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
  dispatch({ type: CLEAR_ERRORS });
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
          dispatch(getAuthenticatedUser());
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

//edit user details in profile page
export const editUserDetails = (userDetails) => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
  const { errors, valid } = validateUserDetails(userDetails);
  if (valid) {
    //FB
    db.doc(`/users/${userHandle}`)
      .update(userDetails)
      .then(() => {
        dispatch(getUserData());
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data,
        });
      });
  } else {
    dispatch({ type: STOP_LOADING_USER });
    dispatch({
      type: SET_ERRORS,
      payload: errors,
    });
  }
};
