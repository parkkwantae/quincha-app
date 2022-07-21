<template>
  <div class="detail-wrap">
    <loading v-if="!data"></loading>
    <div class="info-wrap">
      <div class="img-wrap">
        <img :src="imgUrl" alt="poster" class="poster" />
      </div>
      <div class="info">
        <h1 class="title">{{ data.title }}</h1>
        <ul class="etc-info">
          <li>{{ data.date }}</li>
          <li>
            <span v-for="(item, idx) in data.genres" :key="item.id">
              {{ item.name }}<span v-if="idx < data.genres.length - 1">, </span>
            </span>
          </li>
          <li>{{ data.etcinfo }}</li>
        </ul>
        <p class="content">{{ data.overview }}</p>
      </div>
    </div>
    <div class="cast-wrap">
      <h1 class="cast-title">주요 출연진</h1>
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

<style scoped lang="scss">
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
