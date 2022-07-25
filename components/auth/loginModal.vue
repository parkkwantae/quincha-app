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
        <default-button
          @clickButton="login"
          :propsName="'로그인'"
          :propsColor="'black'"
        ></default-button>
        <default-button
          @clickButton="currentPage = 'join'"
          :propsName="'회원가입'"
          :propsColor="'black'"
        ></default-button>
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
        <default-button
          @clickButton="goLoginPage"
          :propsName="'취소'"
          :propsColor="'black'"
        ></default-button>
        <default-button
          @clickButton="join"
          :propsName="'가입하기'"
          :propsColor="'black'"
        ></default-button>
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
import defaultButton from "@/components/common/defaultButton.vue";

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

  components: { defaultButton },

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

            this.currentPage = "login";
          })
          .catch((e) => {
            alert(e.code), console.error(e);
          });
      }
    },

    async login() {
      await this.$store.dispatch("auth/login", {
        id: this.login_id,
        pw: this.login_pw,
      });
      this.$emit("close");
    },
  },
};
</script>
