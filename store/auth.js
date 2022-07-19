import { firestore } from "@/plugins/firebase";

export const state = () => {
  return {
    currentUser: [],
    currentMediaComment: [],
  };
};

export const getters = {
  getUser(state) {
    return state.currentUser;
  },

  getComments(state) {
    return state.currentMediaComment;
  },
};

export const mutations = {
  setUser(state, payload) {
    state.currentUser = payload;
  },

  logout(state) {
    state.currentUser = [];
  },

  setComment(state, payload) {
    state.currentMediaComment = payload;
  },
};

export const actions = {
  setUser({ commit }, uid) {
    firestore()
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
    const q = firestore().collection("comments").doc(payload.id);

    q.get()
      .then((doc) => {
        if (doc.exists) {
          const comments = doc.data().comments;
          comments.unshift({
            user: state.currentUser,
            rating: payload.ratingValue,
            comment: payload.comment,
          });

          q.update({ comments });

          commit("setComment", comments);
        } else {
          q.set({
            comments: [
              {
                user: state.currentUser,
                rating: payload.ratingValue,
                comment: payload.comment,
              },
            ],
          });
          commit("setComment", {
            user: state.currentUser,
            rating: payload.ratingValue,
            comment: payload.comment,
          });
        }
      })
      .catch((e) => {
        console.error(e);
        alert(e.code);
      });
  },

  async getComment({ commit }, payload) {
    const q = firestore().collection("comments").doc(payload);

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
};
