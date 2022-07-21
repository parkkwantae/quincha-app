import Vue from "vue";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const config = {
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.FB_AUTH_DOMAIN,
  projectId: process.env.FB_PROJECT_ID,
  storageBucket: process.env.FB_STORAGE_BUCKET,
  messagingSenderId: process.env.FB_MESSAGING_SENDERID,
  appId: process.env.FB_APP_ID,
  measurementId: process.env.FB_MEASUREMENT_ID,
};

// firebase.initializeApp(config);

export default function ({ store }, inject) {
  if (!firebase.apps.length) firebase.initializeApp(config);

  // Vue.prototype.$auth = firebase.auth;
  // Vue.prototype.$firestore = firebase.firestore;

  // firebase.auth().onAuthStateChanged(async (user) => {
  //   await store.dispatch("auth/setUser", user.uid);
  // });

  inject("auth", firebase.auth);
  inject("firestore", firebase.firestore);
}

export const firestore = firebase.firestore;
// firebase.initializeApp(config);
// Vue.prototype.$auth = firebase.auth;
