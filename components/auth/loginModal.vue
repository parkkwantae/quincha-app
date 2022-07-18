<template>
  <transition name="loginModal">
    <div class="wrap">
      <div class="login-wrap">
        <input type="id" placeholder="아이디 입력" class="input input-id" />
        <input
          type="password"
          placeholder="비밀번호 입력"
          class="input input-pw"
        />
        <div class="button-wrap">
          <button class="button login-button">로그인</button>
          <button class="button join-button">회원가입</button>
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

<script></script>

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
  width: 500px;
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
    padding: 20px 0 5px 10px;
    margin: 5px 0;
    font-size: 15px;
    width: 70%;
  }
  .input-id {
    margin-top: 20px;
  }

  .close-icon {
    position: absolute;
    top: 10px;
    right: 15px;
    color: #84868d;
    font-size: 20px;
    cursor: pointer;

    &:hover {
      color: #000;
    }
  }
}

.button-wrap {
  align-self: flex-end;
  padding: 20px;

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
