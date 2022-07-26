<!-- index 페이지에 부착하여 선택된 카테고리 값에 따라 영화 리스트를 보여주는 컴포넌트 infinite-loading 라이브러리를 통해 무한스크롤 구현 !-->
<template>
  <div class="ml-wrap">
    <loading v-if="listData == null"></loading>

    <div class="ml-list" v-for="item in listData" :key="item.id">
      <media-card
        :mediadata="item"
        v-if="item.media_type === 'tv' || item.media_type === 'movie'"
      ></media-card>
    </div>

    <infinite-loading
      ref="infiniteLoading"
      v-if="listData.length"
      @infinite="scrolling"
    >
    </infinite-loading>
  </div>
</template>

<script>
import mediaCard from "@/components/mediaCard.vue";
import loading from "@/components/common/loading.vue";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      page: 1,
    };
  },

  computed: {
    ...mapState(["listData", "selectedCategory"]),
    checkCategory() {
      return this.selectedCategory;
    },
  },

  watch: {
    checkCategory(val) {
      if (this.page > 1) {
        this.$refs.infiniteLoading.stateChanger.reset();
        this.page = 1;
      }
    },
  },

  methods: {
    ...mapActions(["getMediaList"]),
    async fetchData() {
      try {
        await this.getMediaList({
          page: this.page,
          category: this.selectedCategory,
        });
      } catch (e) {
        throw e;
      }
    },

    scrolling($state) {
      setTimeout(async () => {
        this.page++;
        try {
          await this.fetchData();
          $state.loaded();
        } catch (e) {
          $state.complete();
          console.error(e);
        }
      }, 500);
    },
  },

  components: {
    mediaCard,
    loading,
  },
};
</script>
