<template>
  <div class="wrap">
    <form class="profile-wrap" @submit.prevent="profileChange"></form>
  </div>
</template>

<script>
export default {
  methods: {
    profileChange() {},
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

.profile-wrap {
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
}
</style>
