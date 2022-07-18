<template>
  <div class="card">
    <nuxt-link
      :to="{
        path: routerPath,
        query: { type: this.mediadata.media_type },
      }"
    >
      <img :src="imgUrl" alt="poster" class="poster" />
    </nuxt-link>
  </div>
</template>

<script>
import { image_url } from "@/plugins/axios";

export default {
  props: ["mediadata"],
  data() {
    return {
      imgUrl:
        this.mediadata.poster_path === null
          ? "https://via.placeholder.com/200x300/000000?text=no+poster"
          : `${image_url}${this.mediadata.poster_path}`,
      routerPath:
        this.mediadata.media_type === "movie"
          ? `/movie/${this.mediadata.id}`
          : `/tv/${this.mediadata.id}`,
    };
  },
};
</script>

<style scoped>
.card {
  width: 200px;
  height: 300px;
  padding: 15px;
}

.poster {
  width: 100%;
  height: 100%;
  /* cursor: pointer; */
}
</style>
