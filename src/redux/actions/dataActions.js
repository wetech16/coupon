// validation

// types
import {
  SET_SCREAMS,
  LOADING_DATA,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  POST_SCREAM,
  CLEAR_ERRORS,
  LOADING_UI,
  STOP_LOADING_UI,
  SET_SCREAM,
  SUBMIT_COMMENT,
  SET_ERRORS,
  LOADING_COMMENT_UI,
} from "./../types";
import { db, firebase } from "../../util/db";

// get all screams
export const getScreams = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  db.collection("screams")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let screams = [];
      data.forEach((doc) => {
        screams.push({
          screamId: doc.id,
          body: doc.data().body,
          userHandle: doc.data().userHandle,
          createdAt: doc.data().createdAt,
          commentCount: doc.data().commentCount,
          likeCount: doc.data().likeCount,
          userImage: doc.data().userImage,
        });
      });
      dispatch({
        type: SET_SCREAMS,
        payload: screams,
      });
    })
    .catch((err) => {
      console.error("ERROR: ", err);
      dispatch({
        type: SET_SCREAMS,
        payload: [],
      });
    });
};

// like scream
export const likeScream = (screamId, userHandle) => (dispatch) => {
  const likeDocument = db
    .collection("likes")
    .where("userHandle", "==", userHandle)
    .where("screamId", "==", screamId)
    .limit(1);
  const screamDocument = db.doc(`/screams/${screamId}`);
  let screamData;
  screamDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        screamData = doc.data();
        screamData.screamId = doc.id;
        return likeDocument.get();
      } else {
        dispatch({
          type: SET_ERRORS,
          payload: { general: "Scream not found" },
        });
      }
    })
    .then((data) => {
      if (data.empty) {
        return db
          .collection("likes")
          .add({
            screamId: screamId,
            userHandle: userHandle,
          })
          .then(() => {
            screamData.likeCount++;
            return screamDocument.update({
              likeCount: screamData.likeCount,
            });
          })
          .then(() => {
            dispatch({
              type: LIKE_SCREAM,
              payload: screamData,
            });
          });
      } else {
        return dispatch({
          type: SET_ERRORS,
          payload: { general: "Scream already liked" },
        });
      }
    })
    .catch((err) => {
      console.error(err);
      dispatch({
        type: SET_ERRORS,
        payload: { genreral: err.code },
      });
    });
};

// unlike scream
export const unLikeScream = (screamId, userHandle) => (dispatch) => {
  const likeDocument = db
    .collection("likes")
    .where("userHandle", "==", userHandle)
    .where("screamId", "==", screamId)
    .limit(1);
  const screamDocument = db.doc(`/screams/${screamId}`);
  let screamData;
  screamDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        screamData = doc.data();
        screamData.screamId = doc.id;
        return likeDocument.get();
      } else {
        return console.log({ error: "Scream not found" });
      }
    })
    .then((data) => {
      if (data.empty) {
        return console.log({ error: "Scream not liked" });
      } else {
        return db
          .doc(`/likes/${data.docs[0].id}`)
          .delete()
          .then(() => {
            screamData.likeCount--;
            return screamDocument.update({
              likeCount: screamData.likeCount,
            });
          })
          .then(() => {
            dispatch({ type: UNLIKE_SCREAM, payload: screamData });
          });
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

export const deleteScream = (screamId) => (dispatch) => {
  dispatch({
    type: DELETE_SCREAM,
    payload: screamId,
  });
};
