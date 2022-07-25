import jwt_decode from "jwt-decode";

export default async function ({ store }) {
  if (!store.getters["auth/getUser"]) {
    const idToken = window.sessionStorage.getItem("idToken");
    if (idToken !== null) {
      const decodedIdToken = jwt_decode(JSON.parse(idToken));
      await store.dispatch("auth/setUser", decodedIdToken.user_id);
    }
  }
}
