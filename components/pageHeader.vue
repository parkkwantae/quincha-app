<!-- 사이트의 헤더를 구현한 컴포넌트로 페이지에 고정적으로 보여주기 위해, position을 fixed로 주고 default 레이아웃에 부착함-->
<template>
  <header class="header">
    <nav class="nav">
      <nuxt-link
        class="logo"
        :to="{
          path: '/',
        }"
      >
        퀸챠
      </nuxt-link>
      <div class="auth-wrap">
        <img
          :src="currentUser.profile_img"
          alt="default_profile"
          class="profile"
          v-if="currentUser"
          @click="settingOpen = !settingOpen"
        />
        <font-awesome-icon
          v-else
          icon="lock"
          class="lock-icon"
          @click="showLoginModal = true"
        />
      </div>

      <login-modal
        v-if="showLoginModal"
        @close="showLoginModal = false"
      ></login-modal>

      <div class="setting-list" v-if="settingOpen">
        <button class="setting" @click="profileOpen">프로필 수정</button>
        <button class="setting" @click="logout">로그아웃</button>
      </div>

      <!-- <profile-change v-if="settingProfileOpen"></profile-change> -->
    </nav>
  </header>
</template>

<script>
import loginModal from "@/components/auth/loginModal.vue";
// import profileChange from "@/components/auth/profileChange.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      showLoginModal: false,
      settingOpen: false,
      settingProfileOpen: false,
      // settingConfirmOpen: false,
    };
  },
  components: {
    loginModal,
    // profileChange,
  },

  methods: {
    ...mapActions({ userReset: "auth/logout" }),
    logout() {
      this.$auth().signOut();
      this.userReset();
      this.settingOpen = false;
    },
    profileOpen() {
      this.settingProfileOpen = true;
      this.settingOpen = false;
    },
  },

  computed: {
    ...mapGetters({ currentUser: "auth/getUser" }),
  },
};
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  height: 50px;
  position: fixed;
  padding: 0.5rem 1rem;
  top: 0;
  left: 0;
  background: #141517;
}

.nav {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: center;
}

.logo {
  // font-family: Nanum-Pen-Regular;
  text-decoration: none;
  font-size: 25px;
  color: #ff0558;
}

.profile {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  cursor: pointer;
}

.lock-icon {
  font-size: 20px;
  color: #84868d;
  cursor: pointer;
  transition: hover 300ms;

  &:hover {
    color: #fff;
  }
}

.setting-list {
  position: absolute;
  top: 25px;
  right: 48px;
  display: flex;
  flex-direction: column;
  width: 120px;
  padding: 0;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  border-radius: 10px 0 10px 10px;

  .setting {
    background-color: #ddd;
    color: #000;
    font-weight: 600;
    padding: 10px;
    border: 0;
    outline: 0;
    font-size: 15px;
    cursor: pointer;

    &:first-child {
      border-bottom: 1px dotted #000;
      border-radius: 10px 0 0 0;
    }
    &:last-child {
      border-radius: 0 0 10px 10px;
    }

    &:hover {
      opacity: 0.9;
    }
  }
}
</style>
