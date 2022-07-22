<!-- mediaInfo 페이지에 부착되어, 각각의 영상물에 대한 사용자 평을 보여주고, 평을 작성할 수 있도록 구현한 컴포넌트 !-->

<template>
  <div class="mc-comment-wrap">
    <loading v-if="showLoading"></loading>
    <h1 class="mc-title">사용자 평</h1>
    <ul class="mc-users-comment" v-if="currentComment.length > 0">
      <li
        class="mc-users-comment-list"
        v-for="(item, idx) in currentComment"
        :key="idx"
      >
        <div class="mc-users-comment-list-info">
          <img :src="item.user.profile_img" />
          <span class="mc-nick">{{ item.user.nick }}</span>
          <div class="mc-rating">
            <star-rating
              :disabled="true"
              :propsStarValue="item.rating"
            ></star-rating>
          </div>
          <font-awesome-icon
            icon="x"
            class="mc-delete-icon"
            @click="(showConfirmModal = true), (selectedComment = item)"
            v-if="loginState && currentUser.uid === item.user.uid"
          />
        </div>
        <p class="mc-users-comment-list-comment">
          {{ item.comment }}
        </p>
      </li>
    </ul>

    <span v-else class="mc-comment-empty">등록된 사용자 평이 없습니다. </span>

    <div class="mc-comment" v-if="loginState">
      <h3 class="mc-comment-title">평가하기</h3>
      <div class="mc-comment-star">
        <star-rating
          @starValue="getRatingValue"
          :propsStarValue="ratingValue"
          :disabled="false"
        ></star-rating>
      </div>
      <textarea
        placeholder="평을 입력해주세요."
        v-model="inputContent"
        class="mc-comment-text"
        wrap="hard"
      />
    </div>
    <div class="mc-comment-button" v-if="loginState">
      <button class="mc-button cancel" @click="commentCancel">취소</button>
      <button class="mc-button submit" @click="commentSubmit">남기기</button>
    </div>

    <transition name="modal-fade">
      <confirm-modal
        v-if="showConfirmModal"
        :alertText="'해당 사용자 평을 삭제하시겠습니까?'"
        @cancel="(showConfirmModal = false), (selectedComment = null)"
        @agree="removeComment"
      ></confirm-modal>
    </transition>
  </div>
</template>

<script>
import StarRating from "./common/starRating.vue";
import confirmModal from "./common/confirmModal.vue";

import { mapGetters, mapActions } from "vuex";
import Loading from "./common/loading.vue";

export default {
  props: ["mediaid"],
  data() {
    return {
      ratingValue: 0,
      // inputName: "",
      selectedComment: null,
      showConfirmModal: false,
      inputContent: "",
      showLoading: false,
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
    ...mapActions({
      addComment: "auth/addComment",
      removeCommentAction: "auth/removeComment",
    }),
    getRatingValue(value) {
      this.ratingValue = value;
    },
    commentCancel() {
      // this.inputName = "";
      this.inputContent = "";
      this.ratingValue = 0;
    },

    async removeComment() {
      this.showConfirmModal = false;
      this.showLoading = true;

      await this.removeCommentAction({
        id: this.mediaid,
        data: this.selectedComment,
      });

      this.showLoading = false;
    },

    async commentSubmit() {
      if (this.ratingValue === 0) alert("별점을 선택해주세요");
      else if (this.inputContent.length < 10)
        alert("평은 10자 이상으로 작성해주세요");
      else {
        this.showLoading = true;
        await this.addComment({
          ratingValue: this.ratingValue,
          comment: this.inputContent,
          id: this.mediaid,
        });
        this.showLoading = false;
        this.commentCancel();
      }
    },
  },

  components: {
    StarRating,
    confirmModal,
    Loading,
  },
};
</script>
