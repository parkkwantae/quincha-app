<template>
  <div class="pd-wrap">
    <person-detail-info></person-detail-info>
  </div>
</template>

<script>
import personDetailInfo from "@/components/personDetailInfo";

export default {
  components: {
    personDetailInfo,
  },

  async asyncData({ store, params }) {
    await store.dispatch("getPerson", params.personId);
  },
};
</script>
