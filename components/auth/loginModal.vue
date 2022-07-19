<template>
  <transition name="loginModal">
    <div class="wrap">
      <form
        class="login-wrap"
        v-if="currentPage === 'login'"
        @submit.prevent="login"
      >
        <input
          type="id"
          placeholder="아이디 입력"
          class="input input-id"
          v-model="login_id"
        />
        <input
          type="password"
          placeholder="비밀번호 입력"
          class="input input-pw"
          v-model="login_pw"
        />
        <div class="button-wrap">
          <button class="button login-button" @click="login" type="submit">
            로그인
          </button>
          <button
            class="button join-button"
            type="button"
            @click="currentPage = 'join'"
          >
            회원가입
          </button>
        </div>
        <font-awesome-icon
          icon="x"
          class="close-icon"
          @click="$emit('close')"
        />
      </form>
      <div v-else class="login-wrap join-wrap">
        <input
          type="id"
          placeholder="아이디 입력"
          class="input input-id"
          v-model="join_id"
        />
        <input
          type="text"
          placeholder="닉네임 입력"
          class="input"
          v-model="join_nick"
        />

        <input
          type="password"
          placeholder="비밀번호 입력"
          class="input input-pw"
          v-model="join_pw"
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          class="input input-pw"
          v-model="join_re_pw"
        />
        <div class="button-wrap">
          <button class="button cancel-button" @click="goLoginPage">
            취소
          </button>
          <button class="button join-submit-button" @click="join">
            가입하기
          </button>
        </div>
        <font-awesome-icon
          icon="x"
          class="close-icon"
          @click="$emit('close')"
        />
      </div>
    </div>
  </transition>
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

<style scoped lang="scss">
.wrap {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
}

.login-wrap {
  width: 400px;
  height: 200px;
  border-radius: 20px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  .input {
    background-color: transparent;
    border: none;
    outline-color: #ff7043;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 12px 0 12px 10px;
    margin: 3px 0;
    font-size: 15px;
    width: 90%;

    &::placeholder {
      font-size: 12px;
      color: #84868d;
    }
  }
  .input-id {
    margin-top: 20px;
  }

  .close-icon {
    position: absolute;
    top: 12px;
    right: 18px;
    color: #84868d;
    font-size: 20px;
    cursor: pointer;

    &:hover {
      color: #000;
    }
  }
}

.join-wrap {
  height: 300px;
}

.button-wrap {
  align-self: flex-end;
  padding: 10px;

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
      color: #000;
    }
  }
}
</style>
