<!-- 카테고리를 선택하는 버튼을 구현한 컴포넌트, index 페이지에 부착 !-->

<template>
  <div
    class="wrap"
    @click="select"
    :class="{ selected: selectedCategory.name === propsdata.name }"
  >
    <span class="category">{{ propsdata.name }}</span>
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

<style scoped lang="scss">
.wrap {
  width: 60px;
  height: 30px;
  border-radius: 12px;
  border: 1px solid #fff;
  padding: 0.2rem;
  display: flex;
  margin: 0.5rem 0.5rem;
  cursor: pointer;
}

.category {
  display: block;
  font-size: 15px;
  margin: auto;
  color: #fff;
  // font-family: Nanum-Pen-Regular;
}

.selected {
  background-color: #fff;

  .category {
    color: #000;
  }
}
</style>
