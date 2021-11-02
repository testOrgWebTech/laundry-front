import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex)
const apiUrl = (process.env.VUE_APP_API_HOST || 'http://localhost:8000') + '/api';

export default new Vuex.Store({
    namespaced: true,
    state: {
        user: null,
    },
    getters: {
        user: (state) => state.user
    },
    actions: {
        async login({ commit }, payload) {
            const res = await axios.post(apiUrl + '/login', payload);
            commit('login', res);
            return res;
        },
        logout({ commit }) {
            commit('logout')
        }
    },
    mutations: {
        login(state, res) {
            state.user = res.data;
            window.localStorage.setItem('authUser', JSON.stringify(state.user));
        },
        logout(state) {
            state.user = null;
            window.localStorage.removeItem('authUser');
        }
    },
})
