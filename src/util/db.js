import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "./config";

firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

export { db, firebase };
