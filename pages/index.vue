<template>
  <div class="id-main">
    <div class="id-category-wrap">
      <category-button :propsdata="{ name: '전체', type: 'all' }">
      </category-button>
      <category-button :propsdata="{ name: '영화', type: 'movie' }">
      </category-button>
      <category-button :propsdata="{ name: 'TV', type: 'tv' }">
      </category-button>

      <div class="id-search-wrap">
        <default-search @search="mediaSearch"></default-search>
      </div>
    </div>

    <media-list></media-list>

    <span class="id-top-button" v-if="showTop" @click="scrollTop">top</span>
  </div>
</template>

<script>
import categoryButton from "@/components/categoryButton.vue";
import mediaList from "@/components/mediaList.vue";
import defaultSearch from "@/components/common/defaultSearch.vue";

export default {
  components: {
    categoryButton,
    mediaList,
    defaultSearch,
  },

  data() {
    return {
      showTop: false,
      timer: null,
    };
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

  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },

  methods: {
    scrollTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },

    async mediaSearch(val) {
      if (val) {
        await this.$store.dispatch("mediaSearch", val);
      }
    },

    handleScroll(e) {
      if (!this.timer) {
        this.timer = setTimeout(() => {
          this.timer = null;
          const scrollTop = e.target.documentElement.scrollTop;
          if (scrollTop > 0) {
            this.showTop = true;
          } else {
            this.showTop = false;
          }
        }, 300);
      }
    },
  },

  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>
