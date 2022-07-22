// import { firestore } from "@/plugins/firebase";

export const state = () => {
  return {
    loginState: false,
    currentUser: null, // 현재 로그인 유저 정보
    currentMediaComment: [], // 현재 선택된 작품 평 리스트
  };
};

export const getters = {
  getUser(state) {
    return state.currentUser;
  },

  getComments(state) {
    return state.currentMediaComment;
  },

  getLoginState(state) {
    return state.loginState;
  },
};

export const mutations = {
  setUser(state, payload) {
    state.loginState = true;
    state.currentUser = payload;
  },

  logout(state) {
    state.currentUser = "";
    state.loginState = false;
  },

  setComment(state, payload) {
    state.currentMediaComment = payload;
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

  logout({ commit }) {
    commit("logout");
  },

  async addComment({ commit, state }, payload) {
    const q = this.$firestore().collection("comments").doc(payload.id);
    const randomId = Math.random().toString(36).substring(2, 12);

    q.get()
      .then((doc) => {
        if (doc.exists) {
          const comments = doc.data().comments;

          comments.unshift({
            user: state.currentUser,
            rating: payload.ratingValue,
            comment: payload.comment,
            id: randomId,
          });

          q.update({ comments });

          commit("setComment", comments);
        } else {
          const comments = [
            {
              user: state.currentUser,
              rating: payload.ratingValue,
              comment: payload.comment,
              id: randomId,
            },
          ];
          q.set({
            comments,
          });
          commit("setComment", comments);
        }
      })
      .catch((e) => {
        console.error(e);
        alert(e.code);
      });
  },

  async getComment({ commit }, payload) {
    const q = this.$firestore().collection("comments").doc(payload);

    q.get()
      .then((doc) => {
        if (doc.exists) {
          commit("setComment", doc.data().comments);
        } else {
          commit("setComment", []);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  },

  async removeComment({ commit }, payload) {
    const q = this.$firestore().collection("comments").doc(payload.id);
    let comments;
    await q
      .get()
      .then(async (doc) => {
        comments = doc.data().comments;
        const idx = comments.findIndex((obj) => obj.id === payload.data.id);
        comments.splice(idx, 1);
      })
      .catch((e) => console.error(e.code));

    await q
      .update({
        comments,
      })
      .then(() => commit("setComment", comments))
      .catch((e) => console.error(e.code));
  },
};
