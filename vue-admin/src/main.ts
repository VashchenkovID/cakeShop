import { createApp } from "vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import "./style.css";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import { definePreset } from "@primevue/themes";
import General from "./pages/general.vue";
import Auth from "./pages/Auth/auth.vue";
//@ts-ignore
import Cookies from "js-cookie";
import NotFound from "./pages/notFound.vue";
import Login from "./pages/Login/Login.vue";
import Directories from "./pages/Directories/Directories.vue";
import DirectoriesDetail from "./pages/DirectoriesDetail/DirectoriesDetail.vue";

const MyPreset = definePreset(Aura, {
  //Your customizations, see the following sections for examples
});

const app = createApp(App);

const routes: RouteRecordRaw[] = [
  { path: "/", component: General },
  { path: "/auth", component: Auth },
  { path: "/login", component: Login },
  { path: "/directories", component: Directories },
  { path: "/directories/:id", component: DirectoriesDetail },
  {
    path: "/:catchAll(.*)",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

app
  .use(router)
  .use(PrimeVue, {
    theme: {
      preset: MyPreset,
    },
  })
  .mount("#app");
