import Vue from 'vue';
import App from './App.vue';
import Vuetify from 'vuetify';

Vue.use(Vuetify);

const vueApp = new Vue({
    el: '#app',
    render: h => h(App)
});
