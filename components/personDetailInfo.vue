<template>
  <div class="pdi-wrap">
    <loading v-if="!personData"></loading>
    <div class="pdi-info">
      <div class="pdi-poster-wrap">
        <img
          :src="`${this.$image_url}${personData.info.profile_path}`"
          class="pdi-poster"
        />
      </div>

      <div class="pdi-person-info">
        <h1 class="pdi-name">{{ personData.info.name }}</h1>
        <h2 class="pdi-gender">
          <span>성별: </span>
          {{ personData.info.gender == 1 ? "여성" : "남성" }}
        </h2>
        <h2 class="pdi-birth">
          <span>생일: </span>{{ personData.info.birthday }}
        </h2>
        <h2 class="pdi-birth-place">
          <span>출생지: </span>{{ personData.info.place_of_birth }}
        </h2>
      </div>
    </div>
    <div class="pdi-credits">
      <h1>출연 작품</h1>
      <ul class="pdi-credits-list-wrap">
        <li
          class="pdi-credits-list"
          v-for="(item, idx) in personData.credits.cast"
          :key="idx"
        >
          <media-card
            :mediadata="item"
            v-if="item.media_type === 'tv' || item.media_type === 'movie'"
          ></media-card>
          <span class="pdi-cast-name">{{
            item.media_type === "movie" ? item.title : item.name
          }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import loading from "@/components/common/loading.vue";
import mediaCard from "@/components/mediaCard.vue";

export default {
  data() {
    return {
      personData: null,
    };
  },

  created() {
    this.personData = this.$store.getters["getPerson"];
  },

  components: {
    loading,
    mediaCard,
  },
};
</script>
