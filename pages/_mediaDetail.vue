<template>
  <div class="md-wrap">
    <media-detail-info
      :data="data"
      :cast="cast"
      :imgUrl="imgUrl"
    ></media-detail-info>
    <media-comment :mediaid="$route.params.mediaDetail"></media-comment>
  </div>
</template>

<script>
import mediaDetailInfo from "@/components/mediaDetailInfo.vue";
import mediaComment from "@/components/mediaComment.vue";

export default {
  components: {
    mediaDetailInfo,
    mediaComment,
  },

  async asyncData({ store, params, query, $image_url }) {
    await store.dispatch("getMediaDetailInfo", {
      id: params.mediaDetail,
      type: query.type,
    });

    await store.dispatch("comment/getComment", params.mediaDetail);
    const info = store.getters.selectedMediaInfo;
    let data = null;

    if (query.type === "movie")
      data = {
        title: info.data.title,
        date: info.data.release_date,
        genres: info.data.genres,
        etcinfo: `${info.data.runtime}분`,
        overview: info.data.overview,
      };
    else
      data = {
        title: info.data.name,
        date: info.data.first_air_date,
        genres: info.data.genres,
        etcinfo: `${info.data.number_of_episodes}부작`,
        overview: info.data.overview,
      };

    const cast = info.credits_data;
    const imgUrl = `${$image_url}${info.data.poster_path}`;

    return { data, cast, imgUrl };
  },
};
</script>
