import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import vuetify from "./plugins/vuetify";
import store from "./store/store";
import { sync } from "vuex-router-sync";

Vue.config.productionTip = false;

Vue.use(Vuetify);
const unsync = sync(store, router);

new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
}).$mount("#app");

unsync();