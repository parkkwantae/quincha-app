<template>
  <div class="ps-wrap">
    <div class="ps-modal">
      <div class="ps-profileImg-wrap">
        <img src="imageSrc" alt="" class="ps-profileImg" @click="clickImg" />
        <input
          ref="fileRef"
          type="file"
          accept="image/*"
          class="ps-inputfile"
          @change="fileChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    fileChange(e) {
      const file = e.target.files[0];
      this.imagefile = file;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise((resolve) => {
        reader.onload = () => {
          this.imageSrc = reader.result;

          resolve();
        };
      });
    },
  },

  created() {
    this.userInfo = this.$store.getters["auth/getUser"];
    this.imageSrc = this.userInfo.profile_img;
  },

  data() {
    return {
      userInfo: null,
      filepath: null,
      imagefile: null,
      imageSrc: null,
    };
  },

  methods: {
    clickImg() {
      this.$refs.fileRef.$el.click();
    },
  },
};
</script>

<style scoped lang="scss">
.ps-wrap {
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

  .ps-modal {
    width: 400px;
    height: 200px;
    border-radius: 20px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }

  .ps-inputfile {
    display: none;
  }

  .ps-profileImg {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: auto;
    cursor: pointer;
    background-color: transparent;
  }
}
</style>
