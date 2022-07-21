<template>
  <div class="modal-wrap">
    <div class="modal">
      <div class="header"></div>
      <div class="body">
        <p class="alertText">{{ alertText }}</p>
      </div>
      <div class="footer">
        <span class="cancel">아니요</span>
        <span class="agree">예</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["alertText"],
};
</script>
