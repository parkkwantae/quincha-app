<!-- props 인자로 받아오는 disabled의 값이 ture면 설정된 별점 값을 보여주는 용도로, false 면 별점을 설정할 수 있도록 구현
mediaComment컴포넌트에 부착 
!-->

<template>
  <div class="sr-wrap">
    <span class="sr-star" :class="disabled ? 'sr-disabled' : null">
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
  props: ["propsStarValue", "disabled"],

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
