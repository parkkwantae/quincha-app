<!-- 카테고리를 선택하는 버튼을 구현한 컴포넌트, index 페이지에 부착 !-->

<template>
  <div
    class="cb-wrap"
    @click="select"
    :class="{ 'cb-selected': selectedCategory.name === propsdata.name }"
  >
    <span class="cb-category">{{ propsdata.name }}</span>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  props: ["propsdata"],
  computed: {
    ...mapState({ selectedCategory: "selectedCategory" }),
  },

  methods: {
    ...mapActions({ getMediaList: "getMediaList" }),
    async select() {
      await this.getMediaList({ page: 1, category: this.propsdata });
    },
  },
};
</script>
