<template>
  <div class="listWrap">
    <loading v-if="this.categoryListData == null"></loading>
    <div class="list" v-for="item in this.categoryListData" :key="item.id">
      <media-card :mediadata="item"></media-card>
    </div>
  </div>
</template>

<script>
import mediaCard from "@/components/mediaCard.vue";
import loading from "@/components/common/loading.vue";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["categoryListData"]),
  },

  components: {
    mediaCard,
    loading,
  },
};
</script>

<style scoped>
.listWrap {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 0.5rem;
}
</style>
