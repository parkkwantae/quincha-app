<!-- index 페이지에 부착하여 선택된 카테고리 값에 따라 영화 리스트를 보여주는 컴포넌트 infinite-loading 라이브러리를 통해 무한스크롤 구현 !-->
<template>
  <div class="listWrap">
    <loading v-if="listData == null"></loading>
    <div class="list" v-for="item in listData" :key="item.id">
      <media-card :mediadata="item"></media-card>
    </div>
    <infinite-loading v-if="listData.length" @infinite="scrolling">
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
      this.page = 1;
    },
  },

  methods: {
    ...mapActions(["getMediaList"]),
    async fetchData() {
      await this.getMediaList({
        page: this.page,
        category: this.selectedCategory,
      });
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

<style scoped lang="scss">
.listWrap {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  /* padding: 8px; */
  justify-content: center;
}
</style>
