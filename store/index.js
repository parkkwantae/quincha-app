import { base_api } from "@/plugins/axios";

export const state = () => {
  return {
    selectedCategory: "", // 선택된 카테고리 정보
    listData: [], // 카테고리에 따른 데이터 리스트
    selectedMediaInfo: "",
  };
};

export const mutations = {
  listSetting(state, payload) {
    if (payload.page <= 1) {
      state.listData = payload.data;
    } else {
      payload.data.forEach((item) => state.listData.push(item));
    }
    state.selectedCategory = payload.category;
  },

  getMediaDetailInfo(state, payload) {
    state.selectedMediaInfo = payload;
  },
};

export const actions = {
  async getMediaList({ commit }, payload) {
    try {
      const response = await base_api.get(
        `/trending/${payload.category.type}/day`,
        {
          params: {
            page: payload.page,
          },
        }
      );

      const data = response.data.results;

      commit("listSetting", {
        data,
        category: payload.category,
        page: payload.page,
      });
    } catch (error) {
      console.log(error.message);
    }
  },

  async getMediaDetailInfo({ commit }, payload) {
    try {
      let response, response_credits;

      switch (payload.type) {
        case "movie": {
          response = await base_api.get(`/movie/${payload.id}`);
          response_credits = await base_api.get(`/movie/${payload.id}/credits`);
          break;
        }
        case "tv": {
          response = await base_api.get(`/tv/${payload.id}`);
          response_credits = await base_api.get(`/tv/${payload.id}/credits`);
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
};
