import Vue from 'vue';
import App from './App.vue';

// Router
import VueRouter from 'vue-router';
import { routes } from './routes';

// Store setup
import VueResource from 'vue-resource';
import { store } from './store/store';

// Bootstrap
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

Vue.use(VueRouter);
Vue.use(VueResource);

export const router = new VueRouter({
    routes,
    mode: 'history'
});

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
