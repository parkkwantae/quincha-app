<template>
  <button
    class="dfb-button"
    :class="propsColor === 'white' ? 'white' : 'black'"
    @click="$emit('clickButton')"
  >
    {{ propsName }}
  </button>
</template>

<script>
export default {
  props: ["propsName", "propsColor"],
};
</script>
