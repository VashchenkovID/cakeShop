<template>
  <div class="Sidebar">
    <MyText
      size="x4l"
      weight="bold"
      view="ghost"
      class="Sidebar__title"
      @click="onRedirect(RoutesEnum.GENERAL)"
      >Cassandra's Cakes</MyText
    >
    <div class="Sidebar__nav">
      <div
        v-for="item in sidebarItems"
        :key="item.link"
        class="Sidebar__nav-item"
        @click="onRedirect(item.link)"
      >
        <MyText
          size="l"
          :view="activeItem === item.link ? 'primary' : 'ghost'"
          >{{ item.label }}</MyText
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MyText from "../../ui/MyText.vue";
import { RoutesEnum } from "../../../utils/enums.ts";
import { useRoute, useRouter } from "vue-router";
import { onBeforeMount, ref } from "vue";

const router = useRouter();
const { path } = useRoute();
const activeItem = ref<string | null>(null);

const sidebarItems = [
  {
    label: "Справочники",
    link: RoutesEnum.DIRECTORIES,
  },
  {
    label: "Товары",
    link: RoutesEnum.GENERAL,
  },
];

const onRedirect = (link: RoutesEnum) => {
  router.push(link);
  activeItem.value = link;
};
onBeforeMount(() => {
  activeItem.value = path;
});
</script>

<style scoped lang="scss">
@import "../../../assets/global";

.Sidebar {
  display: flex;
  flex-direction: column;
  @include fluid(gap, 16px);
  background: radial-gradient(
    350.94% 343.49% at 51.82% -159.87%,
    #404657 0%,
    rgba(64, 70, 87, 0) 100%
  );
  height: 100vh;
  &__title {
    text-align: left;
    cursor: pointer;
  }
  &__nav {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    @include fluid(gap, 16px);
    &-item {
      cursor: pointer;
    }
  }
}
</style>
