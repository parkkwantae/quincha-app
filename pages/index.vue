<template>
  <div id="main">
    <div class="categoryWrap">
      <category-button :propsdata="{ name: '전체', type: 'all' }">
      </category-button>
      <category-button :propsdata="{ name: '영화', type: 'movie' }">
      </category-button>
      <category-button :propsdata="{ name: 'TV', type: 'tv' }">
      </category-button>
    </div>

    <media-list></media-list>

    <span class="top-button" @click="scrollTop">top</span>
  </div>
</template>

<script>
import categoryButton from "@/components/categoryButton.vue";
import mediaList from "@/components/mediaList.vue";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    categoryButton,
    mediaList,
  },

  async fetch() {
    if (this.listData.length === 0) {
      await this.getMediaList({
        page: 1,
        category: { name: "전체", type: "all" },
      });
    }
  },

  computed: {
    ...mapState(["listData"]),
  },

  methods: {
    ...mapActions(["getMediaList"]),
    scrollTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
};
</script>

<style scoped>
#main {
  width: 100%;
  height: 100vh;
}

.categoryWrap {
  width: 100%;
  display: flex;
}

.top-button {
  position: fixed;
  bottom: 10px;
  right: 10px;
  width: 50px;
  height: 50px;
  line-height: 50px;
  border-radius: 50%;
  border: 1px solid #fff;
  color: white;
  text-align: center;
  z-index: 999;
  cursor: pointer;
}
</style>
