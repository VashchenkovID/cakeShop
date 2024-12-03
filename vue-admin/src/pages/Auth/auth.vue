<template>
  <div class="Auth">
    <MyText view="ghost" weight="bold" size="x4l">Регистрация</MyText>
    <div class="Auth__body">
      <MyInput v-model="data.fullName" label="Имя" />
      <MyInput v-model="data.email" label="Почта" />
      <MyInputMask
        v-model="data.phone"
        label="Номер телефона"
        mask="+7(999)-999-99-99"
      />
      <MyInput v-model="data.password" label="Пароль" type="password" />
      <div class="Auth__login">
        <MyText view="primary" size="xs" @click="redirectToLogin"
          >Есть аккаунт? Войти</MyText
        >
      </div>
      <MyButton label="Зарегистрироваться" size="large" @click="submit" />
    </div>
  </div>
</template>

<script setup lang="ts">
import MyButton from "../../components/ui/MyButton.vue";
import MyInput from "../../components/ui/MyInput.vue";
import MyText from "../../components/ui/MyText.vue";
import MyInputMask from "../../components/ui/MyInputMask.vue";
import { ref } from "vue";
import { useValidate, ValidationsKeysEnum } from "../../utils/validations.ts";
import AuthService from "../../api/requests/userAPI.ts";
import Cookies from "js-cookie";
import { useRouter } from "vue-router";
import { RoutesEnum } from "../../utils/enums.ts";

const data = ref<{
  fullName?: string;
  email?: string;
  phone?: string;
  password?: string;
}>({
  fullName: undefined,
  email: undefined,
  phone: undefined,
  password: undefined,
});
const router = useRouter();
const redirectToLogin = () => {
  router.push(RoutesEnum.LOGIN);
};
const submit = async () => {
  try {
    const isValid = useValidate([
      {
        key: ValidationsKeysEnum.EMAIL,
        value: data.value.email || "",
      },
      {
        key: ValidationsKeysEnum.PASSWORD,
        value: data.value.password || "",
      },
    ]);
    if (isValid) {
      const reqBody = {
        fullName: data.value.fullName || "",
        email: data.value.email || "",
        phone: data.value.phone || "",
        password: data.value.password || "",
      };
      const response = await AuthService.registration({ ...reqBody });
      if (response.data && response.data.user.id) {
        Cookies.set("token", response.data.accessToken);
      }
    }
  } catch (e) {}
};
</script>

<style scoped lang="scss">
@import "../../assets/global";

.Auth {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  background: $blockColor;
  @include fluid(width, 500px);
  @include fluid(padding, 30px);
  @include fluid(border-radius, 10px);
  @include fluid(gap, 24px);
  flex-direction: column;
  height: max-content;
  &__body {
    display: flex;
    flex-direction: column;
    @include fluid(gap, 16px);
    width: 100%;
  }
  &__login {
    display: flex;
    justify-content: flex-end;
    width: 100%;
  }
}
</style>
