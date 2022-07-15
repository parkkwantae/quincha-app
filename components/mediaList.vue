<template>
  <div class="listWrap">
    <loading v-if="this.listData == null"></loading>
    <div class="list" v-for="(item, index) in this.listData" :key="index">
      <media-card :mediadata="item"></media-card>
    </div>
    <infinite-loading v-if="this.listData.length" @infinite="scrolling">
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

<style scoped>
.listWrap {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 0.5rem;
}
</style>
