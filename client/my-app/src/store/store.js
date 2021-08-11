import Vue from 'vue';

import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,
    state: {
        token: null,
        user: null,
        isLoggedIn: false,



        posts: [],
    },
    plugins: [
        createPersistedState()
    ],

    mutations: {
        setToken(state, token) {
            state.token = token;
            if (token) {
                state.isLoggedIn = true;
            } else {
                state.isLoggedIn = false;
            }
        },
        setUser(state, user) {
            state.user = user;
        },
        setPosts(state, posts) {
            state.posts = posts
        },

    },
    actions: {
        setToken({ commit }, token) {
            commit('setToken', token);
        },
        setUser({ commit }, user) {
            commit('setUser', user);
        },
        setPosts({ commit }, posts) {
            commit('setPosts', posts);
        },

    },
});