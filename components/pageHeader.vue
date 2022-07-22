<!-- 사이트의 헤더를 구현한 컴포넌트로 페이지에 고정적으로 보여주기 위해, position을 fixed로 주고 default 레이아웃에 부착함-->
<template>
  <header class="ph-header">
    <nav class="ph-nav">
      <nuxt-link
        class="ph-logo"
        :to="{
          path: '/',
        }"
      >
        퀸챠
      </nuxt-link>
      <div class="ph-auth-wrap">
        <img
          :src="currentUser.profile_img"
          alt="default_profile"
          class="ph-profile"
          v-if="currentUser"
          @click="settingOpen = !settingOpen"
        />
        <font-awesome-icon
          v-else
          icon="lock"
          class="ph-lock-icon"
          @click="showLoginModal = true"
        />
      </div>

      <transition name="modal-fade">
        <login-modal
          v-if="showLoginModal"
          @close="showLoginModal = false"
        ></login-modal>
      </transition>

      <div class="ph-setting-list" v-if="settingOpen">
        <button class="ph-setting" @click="profileOpen">프로필 수정</button>
        <button class="ph-setting" @click="logout">로그아웃</button>
      </div>

      <transition name="modal-fade">
        <profile-setting v-if="profileSettingOpen"></profile-setting>
      </transition>
    </nav>
  </header>
</template>

<script>
import loginModal from "@/components/auth/loginModal.vue";
import profileSetting from "@/components/auth/profileSetting.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      showLoginModal: false,
      settingOpen: false,
      profileSettingOpen: false,
    };
  },
  components: {
    loginModal,
    profileSetting,
  },

  methods: {
    ...mapActions({ userReset: "auth/logout" }),
    logout() {
      this.$auth().signOut();
      this.userReset();
      this.settingOpen = false;
    },
    profileOpen() {
      this.profileSettingOpen = true;
      this.settingOpen = false;
    },
  },

  computed: {
    ...mapGetters({ currentUser: "auth/getUser" }),
  },
};
</script>
