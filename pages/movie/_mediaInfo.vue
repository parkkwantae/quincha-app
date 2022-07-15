<template>
  <movie-detail-info
    :movieid="this.$route.params.mediaInfo"
    :type="this.$route.query.type"
  ></movie-detail-info>
</template>

<script>
import movieDetailInfo from "@/components/mediaDetailInfo/movieDetailInfo.vue";

export default {
  components: {
    movieDetailInfo,
  },
};
</script>
