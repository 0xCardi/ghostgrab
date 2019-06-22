// TODO maybe rename to app.js

import Vue from 'vue';
import App from './App.vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';
import VueSocketIO from 'vue-socket.io'
import xhr from 'xhr';

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(Vuetify, { iconfont: 'fa' });

const store = new Vuex.Store({
    state: {
        csrfToken: null,
        account: {
            username: '',
            password: '',
            attemptingLogin: false,
            online: false,
            loginMessage: null,
            away: false,
            avatar: '',
            description: ''
        },
        config: {
            autojoin: [],
            notifications: {
                messages: true,
                chatrooms: true,
                downloads: true,
                uploads: true
            }
        },
        // { user: [ { message: '', time: Date ] ]
        messages: { },
        chatroom: {
            // which rooms we're in
            // { room: [ { user }, ... ] }
            rooms: {},
            // { room: { username: tickerMessage } }
            tickers: {},
            // { room: [ { message }, ... ] }
            messages: {}
        },
        find: {
            query: '',
            type: 'all',
            artists: [],
            albums: [],
            tracks: []
        },
        soulseekFind: {
            query: '',
            files: []
        },
        library: {
            artists: [],
            albums: [],
            tracks: []
        },
        notifications: {
            // chatroom highlights
            // [ { username, message, room, time }
            chatrooms: [],
            // private messages
            // [ { username, message, time }
            messages: [],
            // uploads and downloads
            // [ { username, file, type, time }
            transfers: []
        },
    },
    getters: {
    },
    mutations: {
        setLogin(state, payload) {
            state.account.loginMessage = null;
            state.account.attemptingLogin = true;
            state.account.username = payload.username;
            state.account.password = payload.password;
        },
        setLoginResponse(state, payload) {
            state.account.attemptingLogin = false;
            state.account.online = payload.success;

            if (!payload.success && payload.message) {
                state.account.loginMessage = message;
            }
        },
        setFindQuery(state, payload) {
            state.find.query = payload.query;
            state.find.type = payload.type;
        },
        setFindResults(state, payload) {
            Object.keys(payload).forEach(type => {
                state.find[type].length = 0;
                state.find[type].push(...payload[type]);
            });
        },
        setSoulseekFindQuery(state, payload) {
            state.soulseekFind.query = payload.query;
        },
        setSoulseekFindResults(state, payload) {
            state.soulseekFind.files.push(...payload.files);
        }
    }
});

Vue.use(new VueSocketIO({
    debug: process.env.NODE_ENV !== 'production',
    connection: 'http://localhost:3333'
}));

const vueApp = new Vue({
    el: '#app',
    store,
    render: h => h(App),
    created() {
        console.log('todo get ajax req for csrf token');
    },
    sockets: {
        connect() {
            console.log('connected to socket.io');
        }
    }
});
