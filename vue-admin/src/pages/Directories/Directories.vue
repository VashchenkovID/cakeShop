<template>
  <div class="Directories">
    <MyText size="x3l" view="ghost" weight="bold">Справочники</MyText>
    <div class="Directories__body">
      <div
        v-for="item in directoriesItems"
        class="Directories__body-item"
        @click="onRedirect(item.link)"
      >
        <MyText size="l" view="ghost" weight="semiBold">{{
          item.label
        }}</MyText>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MyText from "../../components/ui/MyText.vue";
import { useRoute, useRouter } from "vue-router";
import { RoutesEnum } from "../../utils/enums.ts";

const router = useRouter();
const route = useRoute();

const directoriesItems = [
  {
    label: "Тип изделия",
    link: "type",
  },
  {
    label: "Начинка",
    link: "filling",
  },
  {
    label: "Бисквит",
    link: "biscuit",
  },
];
const onRedirect = (link: string) => {
  router.push(`${RoutesEnum.DIRECTORIES}/${link}`);
};
</script>

<style scoped lang="scss">
@import "../../assets/global";
.Directories {
  @include fluid(padding, 24px);
  display: flex;
  flex-direction: column;
  @include fluid(gap, 24px);
  align-items: flex-start;
  &__body {
    display: flex;
    align-items: center;
    @include fluid(gap, 16px);
    &-item {
      cursor: pointer;
      @include fluid(padding, 24px);
      background: $blockColor;
      @include fluid(border-radius, 16px);
    }
  }
}
</style>
