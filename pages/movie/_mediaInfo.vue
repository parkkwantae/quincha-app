<template>
  <movie-detail-info
    :movieid="this.$route.params.mediaInfo"
    :type="this.$route.query.type"
  ></movie-detail-info>
</template>

<script>
import movieDetailInfo from "@/components/mediaDetailInfo/movieDetailInfo.vue";
import { mapActions } from "vuex";

export default {
  components: {
    movieDetailInfo,
  },

  mounted() {
    this.getComment(this.$route.params.mediaInfo);
  },

  methods: {
    ...mapActions({ getComment: "auth/getComment" }),
  },
};
</script>
