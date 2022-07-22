<template>
  <div class="cml-modal-wrap">
    <div class="cml-modal">
      <div class="cml-header">
        <span>알림</span>
      </div>
      <div class="cml-body">
        <p class="cml-alertText">{{ alertText }}</p>
      </div>
      <div class="cml-footer">
        <span class="cml-cancel" @click="$emit('cancel')">아니요</span>
        <span class="cml-agree" @click="$emit('agree')">예</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["alertText"],
};
</script>
