export const state = () => {
  return {
    currentMediaComment: null, // 현재 선택된 작품 평 리스트
  };
};

export const getters = {
  getComments(state) {
    return state.currentMediaComment;
  },
};

export const mutations = {
  setComment(state, payload) {
    state.currentMediaComment = payload;
  },
};

export const actions = {
  async addComment({ commit, rootState }, payload) {
    const q = this.$firestore().collection("comments").doc(payload.id);
    const randomId = Math.random().toString(36).substring(2, 12);

    q.get()
      .then((doc) => {
        if (doc.exists && doc.data().comments) {
          const comments = doc.data().comments;

          comments.unshift({
            user: rootState.auth.currentUser,
            rating: payload.ratingValue,
            comment: payload.comment,
            id: randomId,
          });

          q.update({ comments });

          commit("setComment", comments);
        } else {
          const comments = [
            {
              user: rootState.auth.currentUser,
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
          commit("setComment", null);
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
        if (comments.length === 0) comments = null;
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
