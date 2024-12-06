<template>
  <div class="DirectoriesDetailCreate">
    <MyInput v-model="name" label="Наименование" />
    <MyButton label="Закрыть" view="secondary" @click="close" />
    <MyButton label="Создать" @click="submit" />
  </div>
</template>

<script setup lang="ts">
import MyInput from "../../../components/ui/MyInput.vue";
import { ref } from "vue";
import TypeService from "../../../api/requests/typeAPI.ts";
import MyButton from "../../../components/ui/MyButton.vue";
import Cookies from "js-cookie";

interface IComponentProps {
  close(): void;
  refresh(): void;
}
const { close, refresh } = defineProps<IComponentProps>();
const name = ref("");
const token = Cookies.get("token");
const submit = async () => {
  if (!!name.value) {
    await TypeService.createCakeType(
      {
        name: name.value,
      },
      token,
    ).then(() => {
      refresh();
      close();
    });
  }
};
</script>

<style scoped lang="scss">
@import "../../../assets/global";

.DirectoriesDetailCreate {
  display: flex;
  flex-direction: column;
  @include fluid(gap, 24px);
  width: 100%;
}
</style>
