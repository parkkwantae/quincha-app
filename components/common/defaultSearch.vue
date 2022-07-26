<template>
  <form
    class="dfs-search-wrap"
    @submit.prevent="$emit('search', searchText), (searchText = null)"
  >
    <input type="text" v-model="searchText" class="dfs-input" />
    <default-button :propsName="'검색'" :propsColor="'white'"></default-button>
  </form>
</template>

<script>
import defaultButton from "./defaultButton.vue";
export default {
  data() {
    return {
      searchText: null,
    };
  },

  components: {
    defaultButton,
  },
};
</script>
