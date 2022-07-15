<template>
  <div class="wrap">
    <loading v-if="$fetchState.pending"></loading>
    <div class="info-wrap">
      <div class="img-wrap">
        <img :src="imgUrl" alt="poster" class="poster" />
      </div>
      <div class="info">
        <h1 class="title">{{ data.name }}</h1>
        <ul class="etc-info">
          <li>{{ data.first_air_date }}</li>
          <li>
            <span v-for="item in data.genres" :key="item.id"
              >{{ item.name }}
            </span>
          </li>
          <li>{{ data.number_of_episodes }}부작</li>
        </ul>
        <p class="content">{{ data.overview }}</p>
      </div>
    </div>
    <div class="cast-wrap">
      <h2 class="cast-title">주요 출연진</h2>
      <ul class="cast-list-wrap">
        <li class="cast-list" v-for="item in cast" :key="item.id">
          <img
            :src="`${imgSrc}${item.profile_path}`"
            alt="cast-poster"
            class="cast-poster"
          />
          <span class="cast-name">{{ item.name }}</span>
        </li>
      </ul>
    </div>
    <media-comment></media-comment>
  </div>
</template>

<script>
import { image_url } from "@/plugins/axios";
import loading from "@/components/common/loading.vue";
import { mapActions, mapState } from "vuex";
import mediaComment from "@/components/mediaComment.vue";

export default {
  props: ["tvid", "type"],
  data() {
    return {
      data: "",
      cast: "",
      imgUrl: "",
      imgSrc: image_url,
    };
  },
  components: {
    loading,
    image_url,
    mediaComment,
  },

  async fetch() {
    await this.getMediaDetailInfo({ id: this.tvid, type: this.type });
    this.data = this.selectedMediaInfo.data;
    this.cast = this.selectedMediaInfo.credits_data;
    this.imgUrl = `${image_url}${this.data.poster_path}`;
  },
  fetchDelay: 1000,

  computed: {
    ...mapState(["selectedMediaInfo"]),
  },

  methods: {
    ...mapActions(["getMediaDetailInfo"]),
  },
};
</script>

<style scoped>
.wrap {
  max-width: 1200px;
  margin: 0 auto;
  color: white;
}
.info-wrap {
  display: flex;

  flex: 1 2;
}
.img-wrap {
  /* flex-basis: 30%;
  background: red; */
}
.poster {
  width: 100%;
  height: 400px;
}

.info {
  /* flex-basis: 50%;
  background: blue; */
}

.title {
  text-align: center;
}

.etc-info {
  list-style: none;
  display: flex;
  justify-content: space-around;
}

.cast-list-wrap {
  list-style: none;
  display: flex;
  overflow-x: scroll;
}

.cast-list {
  margin: 0 10px;
}

.cast-poster {
  width: 100px;
  height: 100px;
}
</style>
