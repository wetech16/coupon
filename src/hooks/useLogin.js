import { db, firebase } from "../util/db";
import { useState } from "react";

export default function useLogin(email, password) {
  const [errors, setErrors] = useState({});
  const loginUser = (email, password) => {
    const user = {
      email: email,
      password: password,
    };
    firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then((data) => {
        return data.user.getIdToken();
      })
      .then((token) => {
        localStorage.setItem("FBIdToken", `Bear ${token}`);
      })
      .catch((err) => {
        console.error(err);
        setErrors({
          general: err.message,
        });
      });
  };

  return { errors, loginUser };
}
