<!-- 간단한 로그인과, 회원가입을 모달창을 통해 수행할 수 있도록 구현한 컴포넌트, pageHeader 컴포넌트에 부착 
!-->

<template>
  <div class="lm-wrap">
    <form
      class="lm-login-wrap"
      v-if="currentPage === 'login'"
      @submit.prevent="login"
    >
      <input
        type="id"
        placeholder="아이디 입력"
        class="lm-input input-id"
        v-model="login_id"
      />
      <input
        type="password"
        placeholder="비밀번호 입력"
        class="lm-input input-pw"
        v-model="login_pw"
      />
      <div class="lm-button-wrap">
        <button class="lm-button login-button" @click="login" type="submit">
          로그인
        </button>
        <button
          class="lm-button join-button"
          type="button"
          @click="currentPage = 'join'"
        >
          회원가입
        </button>
      </div>
      <font-awesome-icon
        icon="x"
        class="lm-close-icon"
        @click="$emit('close')"
      />
    </form>
    <div v-else class="lm-login-wrap lm-join-wrap">
      <input
        type="id"
        placeholder="아이디 입력"
        class="lm-input input-id"
        v-model="join_id"
      />
      <input
        type="text"
        placeholder="닉네임 입력"
        class="lm-input"
        v-model="join_nick"
      />

      <input
        type="password"
        placeholder="비밀번호 입력"
        class="lm-input input-pw"
        v-model="join_pw"
      />
      <input
        type="password"
        placeholder="비밀번호 확인"
        class="lm-input input-pw"
        v-model="join_re_pw"
      />
      <div class="lm-button-wrap">
        <button class="lm-button cancel-button" @click="goLoginPage">
          취소
        </button>
        <button class="lm-button join-submit-button" @click="join">
          가입하기
        </button>
      </div>
      <font-awesome-icon
        icon="x"
        class="lm-close-icon"
        @click="$emit('close')"
      />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      currentPage: "login",

      login_id: "",
      login_pw: "",

      join_nick: "",
      join_id: "",
      join_pw: "",
      join_re_pw: "",
    };
  },

  methods: {
    ...mapActions({ setUser: "auth/setUser" }),
    goLoginPage() {
      this.login_id = "";
      this.login_pw = "";
      this.join_nick = "";
      this.join_id = "";
      this.join_pw = "";
      this.join_re_pw = "";
      this.currentPage = "login";
    },
    join() {
      const checkEmail =
        /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

      if (!checkEmail.test(this.join_id))
        alert("아이디는 이메일 형식을 준수해주세요");
      else if (this.join_nick.length < 3)
        alert("닉네임은 3자 이상으로 해주세요");
      else if (this.join_pw.length < 8)
        alert("비밀번호는 8자 이상으로 해주세요");
      else if (this.join_pw !== this.join_re_pw)
        alert("비밀번호가 동일하지 않습니다");
      else {
        this.$auth()
          .createUserWithEmailAndPassword(this.join_id, this.join_pw)
          .then(async (user) => {
            await this.$firestore().collection("users").doc(user.user.uid).set({
              id: this.join_id,
              uid: user.user.uid,
              nick: this.join_nick,
              profile_img:
                "https://firebasestorage.googleapis.com/v0/b/quincha-app.appspot.com/o/profile%2Fdefault_profile.png?alt=media&token=99838cd8-5c74-4994-80a9-7b92fb23f1f9",
            });
            alert("가입 완료");

            this.$emit("close");
          })
          .catch((e) => {
            alert(e.code), console.error(e);
          });
      }
    },

    login() {
      this.$auth()
        .signInWithEmailAndPassword(this.login_id, this.login_pw)
        .then(async (user) => {
          await this.setUser(user.user.uid);
          this.$emit("close");
        })
        .catch((e) => {
          alert(e.code);
          console.error(e);
        });
    },
  },
};
</script>
