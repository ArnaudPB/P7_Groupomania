import Vue from 'vue';
import App from './App.vue';
import router from './router'; // vue-router instance
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import vuetify from './plugins/vuetify';
import store from './store/store'; // vuex store instance
import { sync } from 'vuex-router-sync';


Vue.config.productionTip = false;


const moment = require('moment') // gestion de l'affichage des dates avec vue-moment
require('moment/locale/fr')
Vue.use(require('vue-moment'), {
    moment
});
Vue.use(Vuetify);
const unsync = sync(store, router);

new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
}).$mount('#app');

unsync(); // Unsyncs store from router