<template>
  <section class="DirectoriesDetail">
    <MyText size="x3l" view="ghost" weight="bold">{{
      generateNameByParams()
    }}</MyText>
  </section>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import MyText from "../../components/ui/MyText.vue";

const { params } = useRoute();

const generateNameByParams = () => {
  switch (params.id) {
    case "type":
      return "Тип изделия";
    case "filling":
      return "Начинка";
    case "biscuit":
      return "Бисквит";
    default:
      return "Неизвестный тип справочника";
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/global";

.DirectoriesDetail {
  @include fluid(padding, 24px);
  display: flex;
  flex-direction: column;
  @include fluid(gap, 24px);
  align-items: flex-start;
}
</style>
