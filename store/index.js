export const state = () => {
  return {
    selectedCategory: null, // 선택된 카테고리 정보
    listData: null, // 카테고리에 따른 데이터 리스트
    selectedMediaInfo: null, // 현재 선택된 작품정보
    currentMediaComment: null, // 현재 선택된 작품 평 리스트
    searchText: null, // 검색 텍스트
    currentPersonData: null, // 인물 정보
    // loadingState: false,
  };
};

export const getters = {
  selectedMediaInfo(state) {
    return state.selectedMediaInfo;
  },

  getListData(state) {
    return state.listData;
  },
  getComments(state) {
    return state.currentMediaComment;
  },

  getPerson(state) {
    return state.currentPersonData;
  },

  // getLoading(state) {
  //   return state.loadingState;
  // },
};

export const mutations = {
  listSetting(state, payload) {
    if (payload.page <= 1) {
      state.listData = payload.data;
    } else if (state.listData) {
      payload.data.forEach((item) => state.listData.push(item));
    }
    state.selectedCategory = payload.category;
    if (payload.searchText) state.searchText = payload.searchText;
    else state.searchText = null;
  },

  getMediaDetailInfo(state, payload) {
    state.selectedMediaInfo = payload;
  },

  setComment(state, payload) {
    state.currentMediaComment = payload;
  },

  getPerson(state, payload) {
    state.currentPersonData = payload;
  },

  // setLoading(state, payload) {
  //   state.loadingState = payload;
  // },
};

export const actions = {
  async getMediaList({ commit, state }, payload) {
    try {
      let response;
      if (payload.category.type !== "search") {
        response = await this.$base_api.get(
          `/trending/${payload.category.type}/day`,
          {
            params: {
              page: payload.page,
            },
          }
        );
      } else {
        response = await this.$base_api.get("/search/multi", {
          params: {
            query: state.searchText,
            page: payload.page,
          },
        });
      }
      const data = response.data.results;

      commit("listSetting", {
        data,
        category: payload.category,
        page: payload.page,
      });
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  },

  async getMediaDetailInfo({ commit }, payload) {
    try {
      let response, response_credits;

      switch (payload.type) {
        case "movie": {
          response = await this.$base_api.get(`/movie/${payload.id}`);
          response_credits = await this.$base_api.get(
            `/movie/${payload.id}/credits`
          );
          break;
        }
        case "tv": {
          response = await this.$base_api.get(`/tv/${payload.id}`);
          response_credits = await this.$base_api.get(
            `/tv/${payload.id}/credits`
          );
          break;
        }
      }
      const data = response.data;
      const credits_data = response_credits.data.cast.slice(0, 10);
      commit("getMediaDetailInfo", { data, credits_data });
    } catch (error) {
      console.error(error);
    }
  },

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

  async mediaSearch({ commit }, payload) {
    try {
      const response = await this.$base_api.get("/search/multi", {
        params: {
          query: payload,
          page: 1,
        },
      });

      commit("listSetting", {
        data: response.data.results,
        page: 1,
        category: { name: "전체", type: "search" },
        searchText: payload,
      });
    } catch (e) {
      console.error(e.code);
    }
  },

  async getPerson({ commit }, payload) {
    try {
      const response = await this.$base_api.get(`/person/${payload}`);
      const response_credits = await this.$base_api.get(
        `/person/${payload}/combined_credits`
      );

      commit("getPerson", {
        info: response.data,
        credits: response_credits.data,
      });
    } catch (e) {
      console.error(e.code);
    }
  },
};
