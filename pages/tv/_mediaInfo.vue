<template>
  <tv-detail-info
    :tvid="this.$route.params.mediaInfo"
    :type="this.$route.query.type"
  ></tv-detail-info>
</template>

<script>
import tvDetailInfo from "@/components/mediaDetailInfo/tvDetailInfo.vue";

export default {
  components: {
    tvDetailInfo,
  },
};
</script>
