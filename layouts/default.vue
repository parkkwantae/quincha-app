<template>
  <div>
    <page-header></page-header>
    <!-- <loading v-if="getLoading"></loading> -->
    <Nuxt />
  </div>
</template>

<script>
import pageHeader from "@/components/pageHeader.vue";
// import loading from "@/components/common/loading.vue";
// import { mapGetters } from "vuex";

export default {
  components: {
    pageHeader,
    // loading,
  },

  // computed: {
  //   ...mapGetters["getLoading"],
  // },
};
</script>
