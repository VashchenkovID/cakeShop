import {createApp} from 'vue'
import {createMemoryHistory, createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import {definePreset} from "@primevue/themes";
import General from "./pages/general.vue";
import Auth from "./pages/auth.vue";
//@ts-ignore
import Cookies from 'js-cookie'
import NotFound from "./pages/notFound.vue";

const MyPreset = definePreset(Aura, {
    //Your customizations, see the following sections for examples
});

const app = createApp(App);


const routes: RouteRecordRaw[] = [
    {path: '/', component: General},
    {path: '/auth', component: Auth},
    {
        path: "/:catchAll(.*)",
        component: NotFound,
    },
]


const router = createRouter({
    history: createWebHistory(),
    routes
})

app
    .use(router)
    .use(PrimeVue, {
        theme: {
            preset: MyPreset
        }
    })
    .mount('#app')
