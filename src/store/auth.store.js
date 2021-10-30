import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex)
const apiUrl = (process.env.VUE_APP_API_HOST || 'http://localhost:8000') + '/api/auth';

export default new Vuex.Store({
    namespaced: true,
    state: {
    },
    getters: {
    },
    actions: {
    },
    mutations: {
    },
})
