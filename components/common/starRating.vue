<template>
  <div class="wrap">
    <span class="star">
      ★★★★★
      <span :style="`width: ${starWidth}`">★★★★★</span>
      <input
        type="range"
        v-model="starValue"
        step="1"
        min="0"
        max="10"
        @click="$emit('starValue', starValue / 2)"
      />
    </span>
  </div>
</template>

<script>
export default {
  components: {},
  props: ["propsStarValue"],

  data() {
    return {
      starValue: 0,
    };
  },

  computed: {
    starWidth() {
      return `${this.propsStarValue * 20}%`;
    },
  },
};
</script>

<style scope lang="scss">
.star {
  position: relative;
  font-size: 2rem;
  color: #ddd;

  input {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    opacity: 0;
    cursor: pointer;
  }

  span {
    width: 0;
    position: absolute;
    left: 0;
    color: #fbc02d;
    overflow: hidden;
    pointer-events: none;
  }
}
</style>
