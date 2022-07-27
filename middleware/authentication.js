import jwt_decode from "jwt-decode";

export default async function ({ store, $auth }) {
  // const currentUser = $auth().currentUser;
  // console.log(currentUser);
  if (!store.getters["auth/getUser"]) {
    const idToken = window.sessionStorage.getItem("idToken");
    if (idToken) {
      const decodedIdToken = jwt_decode(JSON.parse(idToken));
      console.log(decodedIdToken);
      await store.dispatch("auth/setUser", decodedIdToken.user_id);
    }

    // store.commit[("setLoading", true)];
    // $auth().onAuthStateChanged(async (user) => {
    //   if (user) {
    //     console.log(user);
    //     await store.dispatch("auth/setUser", user.uid);
    //   }
    // store.commit[("setLoading", false)];
    // });
    // console.log(currentUser);
  }
}
