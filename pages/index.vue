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

    <a href="#" class="top-button">top</a>
  </div>
</template>

<script>
import categoryButton from "@/components/categoryButton.vue";
import mediaList from "@/components/mediaList.vue";
import { mapActions } from "vuex";

export default {
  components: {
    categoryButton,
    mediaList,
  },

  async fetch() {
    await this.getMediaList({
      page: 1,
      category: { name: "전체", type: "all" },
    });
  },

  created: {
    fetch()
  },

  methods: {
    ...mapActions(["getMediaList"]),
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
  text-decoration-line: none;
}
</style>
