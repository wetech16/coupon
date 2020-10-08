import validateSignupData from "../util/validator";
import { db, firebase } from "../util/db";
import { useState } from "react";

export default function useSignup(email, password, handle) {
  const [errr, setErrr] = useState({});
  const signupUser = (email, password, handle) => {
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
              console.log("Document data:", doc.data());
              console.log(errr);
              console.log("end");
            } else {
              // sign up auth
              return firebase
                .auth()
                .createUserWithEmailAndPassword(email, password);
            }
          })
          .then((data) => {
            setErrr({
              general: "Signed Up Successfully ",
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
            localStorage.setItem("FBIdToken", `Bear ${token}`);
            //create collection with the set Id document
            return db.doc(`/users/${handle}`).set(userCredentials);
          })
          .then(() => {
            var user = firebase.auth().currentUser;
            return user.sendEmailVerification();
          })
          .then(() => {
            return console.log(token);
          })
          .catch((err) => {
            console.error(err);

            if (err.code) {
              setErrr({
                general: err.message,
              });
            } else {
              setErrr({
                general: "The name/email is already taken",
              });
            }
          })
      : setErrr(errors);
  };

  return { errr, signupUser };
}
