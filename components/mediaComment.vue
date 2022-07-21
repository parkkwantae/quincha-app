<!-- mediaInfo 페이지에 부착되어, 각각의 영상물에 대한 사용자 평을 보여주고, 평을 작성할 수 있도록 구현한 컴포넌트 !-->

<template>
  <div class="comment-wrap">
    <h1 class="title">사용자 평</h1>
    <ul class="users-comment" v-if="currentComment.length > 0">
      <li
        class="users-comment-list"
        v-for="(item, idx) in currentComment"
        :key="idx"
      >
        <div class="users-comment-list-info">
          <img :src="item.user.profile_img" />
          <span class="nick">{{ item.user.nick }}</span>
          <div class="rating">
            <star-rating
              :disabled="true"
              :propsStarValue="item.rating"
            ></star-rating>
          </div>
          <font-awesome-icon
            icon="x"
            class="delete-icon"
            @click="deleteComment"
            v-if="loginState && currentUser.uid === item.user.uid"
          />
        </div>
        <p class="users-comment-list-comment">
          {{ item.comment }}
        </p>
      </li>
    </ul>

    <span v-else class="comment-empty">등록된 사용자 평이 없습니다. </span>

    <div class="comment" v-if="loginState">
      <h3 class="comment-title">평가하기</h3>
      <div class="comment-star">
        <star-rating
          @starValue="getRatingValue"
          :propsStarValue="ratingValue"
          :disabled="false"
        ></star-rating>
      </div>
      <textarea
        placeholder="평을 입력해주세요."
        v-model="inputContent"
        class="comment-text"
        wrap="hard"
      />
    </div>
    <div class="comment-button" v-if="loginState">
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
      loginState: "auth/getLoginState",
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

    async deleteComment() {},

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
  position: relative;
  width: 500px;

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
    margin-left: 15px;
  }

  .delete-icon {
    position: absolute;
    top: 50%;
    right: 5px;
    transform: translateY(-50%);
    cursor: pointer;
    font-size: 12px;

    &:hover {
      color: #ff7043;
    }
  }
}

.users-comment-list-comment {
  width: 500px;

  word-wrap: break-word;
  margin: 10px 0;
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
  font-size: 18px;
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
  // font-family: Nanum-Pen-Regular;
  cursor: pointer;

  &:hover {
    color: #fff;
  }
}
</style>
