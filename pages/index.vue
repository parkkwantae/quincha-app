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
    await this.getMediaList();
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
</style>
