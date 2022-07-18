<template>
  <div>
    <page-header></page-header>
    <Nuxt />
  </div>
</template>

<script>
import pageHeader from "@/components/pageHeader.vue";

export default {
  components: {
    pageHeader,
  },
};
</script>
