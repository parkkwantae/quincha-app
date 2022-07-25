<template>
  <div class="ps-wrap">
    <div class="ps-modal">
      <div class="ps-profileImg-wrap">
        <img :src="imageSrc" alt="" class="ps-profileImg" @click="clickImg" />
        <input
          ref="fileRef"
          type="file"
          accept="image/*"
          class="ps-inputfile"
          @change="fileChange"
        />
      </div>
      <input type="text" class="ps-id-input" :value="userInfo.id" readonly />

      <input type="text" class="ps-nick-input" v-model="nick" />

      <div class="ps-button-wrap">
        <default-button
          :propsName="'취소'"
          :propsColor="'black'"
          @clickButton="$emit('close')"
        ></default-button>
        <default-button
          :propsName="'수정'"
          :propsColor="'black'"
          @clickButton="modify"
          :style="!changed && 'pointer-events: none'"
        ></default-button>
      </div>
    </div>
  </div>
</template>

<script>
import defaultButton from "@/components/common/defaultButton.vue";

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

    modify() {
      console.log("dd");
    },
    clickImg() {
      this.$refs.fileRef.click();
    },
  },

  created() {
    this.userInfo = this.$store.getters["auth/getUser"];
    this.imageSrc = this.userInfo.profile_img;
    this.nick = this.userInfo.nick;
  },

  data() {
    return {
      userInfo: null,
      imagefile: null,
      imageSrc: null,
      nick: null,
      changed: false,
    };
  },

  computed: {
    checkChanged() {
      if (
        this.userInfo &&
        (this.userInfo.profile_img !== this.imageSrc ||
          this.userInfo.nick !== this.nick)
      ) {
        return true;
      } else {
        return false;
      }
    },
  },

  watch: {
    checkChanged(val) {
      this.changed = val;
    },
  },

  components: {
    defaultButton,
  },
};
</script>

DefaultButton
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

  .ps-close-icon {
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

  .ps-id-input,
  .ps-nick-input {
    width: 200px;
    padding: 5px;
    font-size: 18px;
    margin: 3px;
    border-radius: 10px;
    outline: none;
  }

  .ps-id-input {
    background-color: #ccc;
  }

  .ps-button-wrap {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
