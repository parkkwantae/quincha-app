<template>
  <div class="comment-wrap">
    <h1 class="title">사용자 평</h1>
    <ul class="users-comment" v-if="this.currentComment.length > 0">
      <li
        class="users-comment-list"
        v-for="(item, idx) in this.currentComment"
        :key="idx"
      >
        <div class="users-comment-list-info">
          <img :src="item.user.profile_img" />
          <span class="nick">{{ item.user.nick }}</span>
          <span class="rating">{{ item.rating }}</span>
        </div>
        <p class="users-comment-list-comment">
          {{ item.comment }}
        </p>
      </li>
    </ul>

    <span v-else class="comment-empty">등록된 사용자 평이 없습니다. </span>

    <div
      class="comment"
      v-if="this.currentUser.length !== 0 || this.currentUser == null"
    >
      <h3 class="comment-title">평가하기</h3>
      <div class="comment-star">
        <star-rating
          @starValue="getRatingValue"
          :propsStarValue="ratingValue"
        ></star-rating>
      </div>
      <!-- <input
        type="text"
        placeholder="닉네임을 입력해주세요"
        v-model="inputName"
        class="comment-input"
      /> -->
      <textarea
        placeholder="평을 입력해주세요."
        v-model="inputContent"
        class="comment-text"
        wrap="hard"
      />
    </div>
    <div
      class="comment-button"
      v-if="this.currentUser.length !== 0 || this.currentUser == null"
    >
      <button class="button cancel" @click="commentCancel">취소</button>
      <button class="button submit" @click="commentSubmit">남기기</button>
    </div>
  </div>
</template>

<script>
import StarRating from "./common/starRating.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["mediaid"],
  data() {
    return {
      ratingValue: 0,
      // inputName: "",
      inputContent: "",
    };
  },

  computed: {
    ...mapGetters({
      currentUser: "auth/getUser",
      currentComment: "auth/getComments",
    }),
  },

  methods: {
    ...mapActions({ addComment: "auth/addComment" }),
    getRatingValue(value) {
      this.ratingValue = value;
    },
    commentCancel() {
      // this.inputName = "";
      this.inputContent = "";
      this.ratingValue = 0;
    },

    async commentSubmit() {
      if (this.ratingValue === 0) alert("별점을 선택해주세요");
      else if (this.inputContent.length < 10)
        alert("평은 10자 이상으로 작성해주세요");
      else {
        await this.addComment({
          ratingValue: this.ratingValue,
          comment: this.inputContent,
          id: this.mediaid,
        });
        this.commentCancel();
      }
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

.users-comment {
  padding: 10px;
  list-style: none;

  .users-comment-list {
    margin-top: 10px;
  }
}

.users-comment-list-info {
  display: flex;
  align-items: center;

  img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
  }

  .nick {
    margin-left: 5px;
    font-size: 25px;
  }

  .rating {
    margin-left: 20px;
  }
}

.users-comment-list-comment {
  width: 500px;

  word-wrap: break-word;
  margin-top: 5px;
  font-size: 20px;
  color: #84868d;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.comment-empty {
  display: block;
  font-size: 20px;
  margin-top: 5px;
  color: #84868d;
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
