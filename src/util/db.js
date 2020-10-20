import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import firebaseConfig from "./config";

firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();
const storage = firebase.storage();

export { db, firebase, storage };
