export const state = () => {
  return {
    currentUser: null, // 현재 로그인 유저 정보
  };
};

export const getters = {
  getUser(state) {
    return state.currentUser;
  },
};

export const mutations = {
  setUser(state, payload) {
    state.currentUser = payload;
  },

  logout(state) {
    state.currentUser = null;
    window.sessionStorage.removeItem("idToken");
  },
};

export const actions = {
  async setUser({ commit }, uid) {
    await this.$firestore()
      .collection("users")
      .doc(uid)
      .get()
      .then((doc) => commit("setUser", doc.data()))
      .catch((e) => console.error(e));
  },

  async login({ dispatch }, payload) {
    await this.$auth()
      .signInWithEmailAndPassword(payload.id, payload.pw)
      .then(async (user) => {
        await dispatch("setUser", user.user.uid);

        this.$auth()
          .currentUser.getIdToken(true)
          .then((idToken) => {
            window.sessionStorage.setItem("idToken", JSON.stringify(idToken));
          });
        // window.sessionStorage.setItem(
        //   "idToken",
        //   JSON.stringify(user.user.refreshToken)
        // );
      })
      .catch((e) => {
        alert(e.code);
        console.error(e);
      });
  },

  logout({ commit }) {
    commit("logout");
  },

  async profileModify({ dispatch }, payload) {
    const q = this.$firestore().collection("users").doc(payload.uid);

    if (!payload.imageFile) {
      q.update({ nick: payload.nick });
    } else {
      const storageRef = this.$storage()
        .ref()
        .child(`profile/${payload.uid}/profile_img.png`);
      await storageRef.put(payload.imageFile);
      const storageUrl = await storageRef.getDownloadURL();
      await q.update({
        nick: payload.nick,
        profile_img: storageUrl,
      });
    }

    await dispatch("setUser", payload.uid);
  },
};
