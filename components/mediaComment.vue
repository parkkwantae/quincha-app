<template>
  <div class="comment-wrap">
    <h1 class="title">사용자 평</h1>

    <div class="comment">
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
        class="comment-input"
      />
      <textarea
        placeholder="평을 입력해주세요."
        v-model="inputContent"
        class="comment-text"
      />
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

<style scoped lang="scss">
.comment-wrap {
  margin-top: 20px;
}
.comment {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  width: 500px;
}
.comment-title {
  font-size: 25px;
  font-weight: 100;
}

.comment-input {
  margin-top: 20px;
  width: 300px;
  padding: 5px 10px;
}

.comment-text {
  margin-top: 10px;
  width: 100%;
  height: 200px;
  padding: 5px 10px;
  resize: none;
}

.comment-button {
  margin-top: 10px;
  width: 500px;
  display: flex;
  justify-content: flex-end;
}

.button {
  border: none;
  outline: none;
  padding: 5px;
  background-color: transparent;
  color: #84868d;
  font-size: 25px;
  font-family: Nanum-Pen-Regular;
  cursor: pointer;

  &:hover {
    color: #fff;
  }
}
</style>
