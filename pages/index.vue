<template>
  <div class="id-main">
    <div class="id-categoryWrap">
      <category-button :propsdata="{ name: '전체', type: 'all' }">
      </category-button>
      <category-button :propsdata="{ name: '영화', type: 'movie' }">
      </category-button>
      <category-button :propsdata="{ name: 'TV', type: 'tv' }">
      </category-button>
    </div>

    <media-list></media-list>

    <span class="id-top-button" @click="scrollTop">top</span>
  </div>
</template>

<script>
import categoryButton from "@/components/categoryButton.vue";
import mediaList from "@/components/mediaList.vue";

export default {
  components: {
    categoryButton,
    mediaList,
  },

  async asyncData({ store }) {
    const listData = store.getters.getListData;
    if (!listData) {
      await store.dispatch("getMediaList", {
        page: 1,
        category: { name: "전체", type: "all" },
      });
    }
  },

  methods: {
    scrollTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
};
</script>
