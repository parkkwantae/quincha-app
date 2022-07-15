import { base_api } from "@/plugins/axios";

export const state = () => {
  return {
    selectedCategory: "", // 선택된 카테고리 정보
    categoryListData: [], // 카테고리에 따른 데이터 리스트
    selectedMediaInfo: "",
  };
};

export const mutations = {
  initialSetting(state, payload) {
    state.selectedCategory = payload.initialCategory;
    state.categoryListData = payload.initialListData;
  },

  categoryClick(state, payload) {
    state.selectedCategory = payload.payload;
    state.categoryListData = payload.data;
  },

  getMediaDetailInfo(state, payload) {
    state.selectedMediaInfo = payload;
  },
};

export const actions = {
  async getMediaList({ commit }) {
    let initialListData = [];

    try {
      for (let i = 1; i <= 2; i++) {
        const response = await base_api.get(`/trending/all/day`, {
          params: {
            page: i,
          },
        });

        const data = response.data.results;
        initialListData = initialListData.concat(data);
      }

      const initialCategory = { name: "전체", type: "all" };
      commit("initialSetting", { initialListData, initialCategory });
    } catch (error) {
      console.log(error.message);
    }
    // const response = await base_api.get("/trending/all/day");

    // const initialListData = response.data.results;

    // const initialCategory = { name: "전체", type: "all" };
    // commit("initialSetting", { initialListData, initialCategory });
  },

  async categoryClick({ commit }, payload) {
    let dataArray = [];

    try {
      for (let i = 1; i <= 2; i++) {
        const response = await base_api.get(`/trending/${payload.type}/day`, {
          params: {
            page: i,
          },
        });

        const data = response.data.results;
        dataArray = dataArray.concat(data);
      }

      commit("categoryClick", { payload, data: dataArray });
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
