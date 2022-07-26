<template>
  <div class="ps-wrap">
    <loading v-if="showLoading"></loading>
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
import loading from "@/components/common/loading.vue";

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

    async modify() {
      if (this.nick.length < 3) {
        alert("닉네임은 3자 이상으로 해주세요");
      } else {
        this.showLoading = true;
        await this.$store.dispatch("auth/profileModify", {
          uid: this.userInfo.uid,
          id: this.userInfo.id,
          nick: this.nick,
          imageFile: this.imagefile,
        });
        this.$emit("close");
        this.showLoading = false;
      }
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
      showLoading: false,
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
    loading,
  },
};
</script>
