<template>
  <div class="wrap">
    <h2 class="title">사용자 평</h2>

    <div class="comment-wrap">
      <h3 class="comment-title">평가하기</h3>
      <div class="comment-star">
        <star-rating
          @starValue="getRatingValue"
          :propsStarValue="ratingValue"
        ></star-rating>
      </div>
      <input
        type="text"
        placeholder="닉네임을 입력해주세요"
        v-model="inputName"
      />
      <textarea placeholder="평을 입력해주세요." v-model="inputContent" />
    </div>
    <div class="comment-button">
      <button class="button cancel" @click="commentCancel">취소</button>
      <button class="button submit">남기기</button>
    </div>
  </div>
</template>

<script>
import StarRating from "./common/starRating.vue";

export default {
  data() {
    return {
      ratingValue: 0,
      inputName: "",
      inputContent: "",
    };
  },

  methods: {
    getRatingValue(value) {
      this.ratingValue = value;
    },
    commentCancel() {
      this.inputName = "";
      this.inputContent = "";
      this.ratingValue = 0;
    },
  },

  components: {
    StarRating,
  },
};
</script>

<style scoped></style>
