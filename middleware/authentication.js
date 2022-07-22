export default async function ({ $auth, store }) {
  if (!store.getters["auth/getLoginState"]) {
    await $auth().onAuthStateChanged(async (user) => {
      await store.dispatch("auth/setUser", user.uid);
    });
  }
}
