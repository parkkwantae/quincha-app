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
      imgUrl: `${image_url}${this.mediadata.poster_path}`,
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
  width: 10rem;
  height: 12rem;
  padding: 0.5rem;
}

.poster {
  width: 100%;
  height: 100%;
  /* cursor: pointer; */
}
</style>
