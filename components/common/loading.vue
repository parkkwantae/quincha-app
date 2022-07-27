<!-- 간단한 로딩 스피너 컴포넌트 !-->

<template>
  <div class="ld-loading" v-if="showLoading">
    <span></span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showLoading: false,
    };
  },

  methods: {
    start() {
      this.showLoading = true;
    },

    finish() {
      this.showLoading = false;
    },
  },
};
</script>
