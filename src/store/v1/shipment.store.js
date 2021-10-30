import Base from '../base.store'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const baseUrl = '/api/shipments'
const base = new Base(baseUrl)

export default new Vuex.Store({
    namespaced: true,
    state: {
        ...base.state
    },
    getters: {
        ...base.getters
    },
    actions: {
        ...base.actions
    },
    mutations: {
        ...base.mutations
    },
})

