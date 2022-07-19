import Vue from "vue";
import firebase from "firebase/app";
import "firebase/auth";

const config = {
  apikey: process.env.FB_API_KEY,
  authDomain: process.env.FB_AUTH_DOMAIN,
  projectId: process.env.FB_PROJECT_ID,
  storageBucket: process.env.FB_STORAGE_BUCKET,
  messagingSenderId: process.env.FB_MESSAGING_SENDERID,
  appId: process.env.FB_APP_ID,
};

export default function ({ store, redirect }) {
  if (!firebase.apps.length) firebase.initializeApp(config);
  Vue.prototype.$auth = firebase.auth;
}
// firebase.initializeApp(config);
// Vue.prototype.$auth = firebase.auth;
