<script setup lang="ts">
import AuthService from "./api/requests/userAPI.ts";
import { computed, onBeforeMount, ref, watch } from "vue";
import Cookies from "js-cookie";
import { useRoute } from "vue-router";
import Header from "./components/common/Header/Header.vue";
const routerPaths = ["/auth", "/login"];
const route = useRoute();
const isSidebar = ref(false);
const initialGetUser = async () => {
  try {
    const res = await AuthService.checkLogin();
    if (res.data.isAuth && res.data.user?.fullName) {
      Cookies.set("username", res.data.user?.fullName);
      return;
    }
    if (!res.data.isAuth) {
      Cookies.remove("username");
      Cookies.remove("token");
    }
  } catch (e) {}
};
onBeforeMount(async () => {
  /**
   * Проверяем пользователя
   */
  await initialGetUser();
});
watch(
  () => route.path,
  (val) => {
    isSidebar.value = !routerPaths.includes(val);
  },
);
onBeforeMount(() => {
  isSidebar.value = true;
});
</script>

<template>
  <main v-if="isSidebar" class="App">
    <Header />
    <section v-if="isSidebar" class="App__body">
      <Sidebar class="App__sidebar" />
      <router-view></router-view>
    </section>
  </main>
  <router-view v-else class="App"></router-view>
</template>

<style lang="scss">
@import "assets/global";
body {
  margin: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: $backgroundColor;
  height: 100vh;
  overflow: hidden;
}
p {
  margin: 0;
  padding: 0;
}
.App {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  &__body {
    display: grid;
    grid-template-columns: 0.3fr 1fr;
  }
  &__sidebar {
    @include fluid(padding, 16px);
    width: 100%;
  }
}
#app {
  margin: 0;
  padding: 0;
  max-width: 100%;
  width: 100%;
}
</style>
