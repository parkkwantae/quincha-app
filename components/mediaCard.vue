<!-- mediaList 컴포넌트에 부착되어, 미디어 정보를 받아 각각 카드 형식으로 미디어 포스터를 보여주는 컴포넌트 nuxt-link를 통하여 포스터 클릭시 해당 경로로 라우터 이동  !-->
<template>
  <div class="card">
    <nuxt-link
      :to="{
        path: routerPath,
        query: { type: mediadata.media_type },
      }"
    >
      <img :src="imgUrl" alt="poster" class="poster" />
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: ["mediadata"],
  data() {
    return {
      imgUrl:
        this.mediadata.poster_path === null
          ? "https://via.placeholder.com/200x300/000000?text=no+poster"
          : `${this.$image_url}${this.mediadata.poster_path}`,
      routerPath: `/${this.mediadata.id}`,
    };
  },
};
</script>

<style scoped lang="scss">
.card {
  width: 200px;
  height: 300px;
  padding: 15px;
}

.poster {
  width: 100%;
  height: 100%;
}
</style>
