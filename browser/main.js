// TODO maybe rename to app.js

import Vue from 'vue';
import App from './App.vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(Vuetify, { iconfont: 'fa' });

const store = new Vuex.Store({
    state: {
        account: {
            username: '',
            password: '',
            attemptingLogin: false,
            online: false,
            loginMessage: null,
            avatar: '',
            description: '',
        },
        awayStatus: 'online',
        // { user: [ { message: '', time: Date ] ]
        privateMessages: { },
        chatroom: {
            autojoin: [],
            // which rooms we're in
            // { room: [ { user }, ... ] }
            rooms: {},
            // { room: { username: tickerMessage } }
            tickers: {},
            // { room: [ { message }, ... ] }
            messages: {}
        },
        searchResults: {
            all: [],
            artists: [],
            albums: [],
            tracks: []
        },
        library: {
            artists: [],
            albums: [],
            tracks: []
        }
    },
    mutations: {
        attemptLogin(state, payload) {
            state.account.loginMessage = null;
            state.account.attemptingLogin = true;
            state.account.username = payload.username;
            state.account.password = payload.password;
        },
        loginResponse(state, payload) {
            state.account.attemptingLogin = false;
            state.account.online = payload.success;

            if (!payload.success && payload.message) {
                state.account.loginMessage = message;
            }
        }
    }
});

const vueApp = new Vue({
    el: '#app',
    store,
    render: h => h(App)
});
