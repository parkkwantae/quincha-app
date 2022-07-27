<template>
  <div class="mdi-detail-wrap">
    <loading v-if="!data"></loading>
    <div class="mdi-info-wrap">
      <div class="mdi-img-wrap">
        <img :src="imgUrl" alt="poster" class="mdi-poster" />
      </div>
      <div class="mdi-info">
        <h1 class="mdi-title">{{ data.title }}</h1>
        <ul class="mdi-etc-info">
          <li>{{ data.date }}</li>
          <li>
            <span v-for="(item, idx) in data.genres" :key="item.id">
              {{ item.name }}<span v-if="idx < data.genres.length - 1">, </span>
            </span>
          </li>
          <li>{{ data.etcinfo }}</li>
        </ul>
        <p class="mdi-content">{{ data.overview }}</p>
      </div>
    </div>
    <div class="mdi-cast-wrap">
      <h1 class="mdi-cast-title">주요 출연진</h1>
      <ul class="mdi-cast-list-wrap">
        <li class="mdi-cast-list" v-for="item in cast" :key="item.id">
          <nuxt-link
            :to="{
              path: `/personDetail/${item.id}`,
            }"
          >
            <img
              :src="
                item.profile_path === null
                  ? `https://via.placeholder.com/100/4A4F5A/000000?text=no+poster`
                  : `${imgSrc}${item.profile_path}`
              "
              alt="cast-poster"
              class="mdi-cast-poster"
            />
          </nuxt-link>
          <span class="mdi-cast-name">{{ item.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import loading from "@/components/common/loading.vue";
import mediaComment from "@/components/mediaComment.vue";

export default {
  props: ["data", "cast", "imgUrl"],
  data() {
    return {
      imgSrc: this.$image_url,
    };
  },
  components: {
    loading,
    mediaComment,
  },
};
</script>
