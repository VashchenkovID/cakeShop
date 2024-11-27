<template>
  <div class="Auth">
    <div class="Auth__body">
      <MyInput label="Почта"/>
      <MyInput label="пароль" type="password"/>
      <MyButton label="Войти"/>
    </div>
  </div>
</template>

<script setup lang="ts">

import MyButton from "../components/ui/MyButton.vue";
import MyInput from "../components/ui/MyInput.vue";
</script>

<style scoped lang="scss">
@import "../assets/global";

.Auth {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  background:  #404657;
  @include fluid(width, 500px);
  @include fluid(padding, 30px);
  @include fluid(border-radius, 10px);
  &__body {
    display: flex;
    flex-direction: column;
    @include fluid(gap, 16px);
    width:100%;
  }
}
</style>