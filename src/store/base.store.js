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
                console.log(res)
                state.list = res.data;
            },
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
            },
            async getOne({ commit }) {
                const res = axios.get(apiUrl + `${baseUrl}/id`, /*header*/);
            },
            async save({ commit }) {
                const res = axios.post(apiUrl + `${baseUrl}`, /*header*/);
            },
            async update({ commit }) {
                const res = axios.put(apiUrl + `${baseUrl}/id`, /*header*/);
            },
            async delete({ commit }) {
                const res = axios.delete(apiUrl + `${baseUrl}/id`, /*header*/);
            }
        };
    }
}
