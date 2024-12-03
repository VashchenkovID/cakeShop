<template>
  <div class="Login">
    <MyText view="ghost" weight="bold" size="x4l">Авторизация</MyText>
    <div class="Login__body">
      <MyInput v-model="data.email" label="Почта" />
      <MyInput v-model="data.password" label="Пароль" type="password" />
      <MyButton label="Зарегистрироваться" size="large" @click="submit" />
    </div>
  </div>
</template>

<script setup lang="ts">
import MyText from "../../components/ui/MyText.vue";
import MyInput from "../../components/ui/MyInput.vue";
import MyButton from "../../components/ui/MyButton.vue";
import { ref } from "vue";
import { useValidate, ValidationsKeysEnum } from "../../utils/validations.ts";
import AuthService from "../../api/requests/userAPI.ts";
import Cookies from "js-cookie";
import { useRouter } from "vue-router";
import { RoutesEnum } from "../../utils/enums.ts";

const router = useRouter();

const data = ref<{
  email: string;
  password: string;
}>({
  email: "",
  password: "",
});
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
        email: data.value.email || "",
        password: data.value.password || "",
      };
      const response = await AuthService.login({ ...reqBody });
      if (response.data && response.data.user.id) {
        Cookies.set("token", response.data.accessToken);
        await router.push(RoutesEnum.GENERAL);
      }
    }
  } catch (e) {}
};
</script>

<style scoped lang="scss">
@import "../../assets/global";

.Login {
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
}
</style>
