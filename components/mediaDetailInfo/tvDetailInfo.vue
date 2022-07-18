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
            <span v-for="(item, idx) in data.genres" :key="item.id">
              {{ item.name }}<span v-if="idx < data.genres.length - 1">, </span>
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
            :src="
              item.profile_path === null
                ? `https://via.placeholder.com/100/4A4F5A/000000?text=no+poster`
                : `${imgSrc}${item.profile_path}`
            "
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

<style scoped lang="scss">
.wrap {
  max-width: 1200px;
  margin: 0 auto;
  color: white;
  font-family: Nanum-Pen-Regular;
  padding: 10px;
}
.info-wrap {
  display: flex;
  gap: 50px;

  @media (max-width: 650px) {
    flex-direction: column;
  }
}
.img-wrap {
  flex-basis: 50%;
}
.poster {
  width: 100%;
  height: 400px;
}

.info {
  flex-basis: 50%;
  line-height: 1.5;
}

.title {
  font-size: 35px;
}

.etc-info {
  font-size: 25px;
  list-style: none;
  display: flex;
  justify-content: space-around;
  margin-top: 10px;

  @media (max-width: 1150px) {
    display: flex;
    flex-direction: column;
  }
}

.content {
  margin-top: 20px;
  font-size: 20px;
  display: -webkit-box;
  -webkit-line-clamp: 7;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cast-wrap {
  margin-top: 20px;
}

.cast-list-wrap {
  margin-top: 10px;
  list-style: none;
  display: flex;
  overflow-x: auto;

  &::-webkit-scrollbar {
    width: 10px;
    height: 14px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #b0b0b0;
    border-radius: 10px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }
  &::-webkit-scrollbar-track {
    background-color: #e0e0e0;
    border-radius: 10px;
    box-shadow: inset 0px 0px 3px white;
  }
}

.cast-list {
  margin: 0 10px;
  padding: 0;
}

.cast-poster {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.cast-name {
  font-size: 18px;
  display: block;
  text-align: center;
  margin: 5px 0;
}
</style>
