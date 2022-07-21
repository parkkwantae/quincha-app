export default async function ({ $auth, store }) {
  if (!store.getters["auth/getLoginState"]) {
    $auth().onAuthStateChanged(async (user) => {
      await store.dispatch("auth/setUser", user.uid);
    });
  }
}
