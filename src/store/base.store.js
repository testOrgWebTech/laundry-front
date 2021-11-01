import axios from "axios"

const apiUrl = process.env.VUE_APP_API_HOST || 'http://localhost:8000';

export default class {
    constructor(baseUrl) {
        this.state = {
            list: []
        };
        this.getters = {
            list: (state) => state.list
        };
        this.mutations = {
            setList(state, res) {
                state.list = res.data;
            },
            addItem(state, res) {
                state.list.push(res.data);
            }
            /*getOne(state, res) {
                state.list
            },
            save(state, res) {
                state.list.push(res.data)
            },
            update(state, res) {
                state.list.
            },
            delete(state, res) {
                state.list.delete()
            }*/
        };
        this.actions = {
            async get({ commit }) {
                const res = await axios.get(apiUrl + `${baseUrl}`, /*header*/);
                commit("setList", res);
                return res;
            },
            async getOne({ commit }) {
                const res = axios.get(apiUrl + `${baseUrl}/id`, /*header*/);
            },
            async save({ commit }, payload) {
                const res = axios.post(apiUrl + `${baseUrl}`, payload,/*header*/);
                commit("addItem", res);
                return res;
            },
            async update({ commit }, payload) {
                const res = axios.put(apiUrl + `${baseUrl}/${payload.id}`, payload, /*header*/);
                commit("setList", res);
                return res;
            },
            async delete({ commit }) {
                const res = axios.delete(apiUrl + `${baseUrl}/id`, /*header*/);
                commit("setList", res);
            }
        };
    }
}
