import Vue from "vue";
import InfiniteLoading from "vue-infinite-loading";

Vue.component("infinite-loading", InfiniteLoading);

Vue.use(InfiniteLoading, {
  props: {
    spinner: "circles",
  },
  slots: { error: "에러 발생" },
});
