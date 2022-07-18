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
          src="@/assets/images/default_profile.png"
          alt="default_profile"
          class="profile"
          v-if="this.currentUser"
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
    </nav>
  </header>
</template>

<script>
import loginModal from "@/components/auth/loginModal.vue";
import { mapState } from "vuex";

export default {
  data() {
    return {
      showLoginModal: false,
    };
  },
  components: {
    loginModal,
  },

  computed: {
    ...mapState({ currentUser: "auth/currentUser" }),
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
  font-family: Nanum-Pen-Regular;
  text-decoration: none;
  font-size: 25px;
  color: #ff0558;
}

.profile {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
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
</style>
