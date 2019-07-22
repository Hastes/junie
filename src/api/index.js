import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import BASE_URL from './config'
import JwtService from './jwt.service'

const ApiService = {
    init() {
        Vue.use(VueAxios, axios);
        Vue.axios.defaults.baseURL = BASE_URL;
    },
    setHeader() {
        Vue.axios.defaults.headers.common['Authorization'] = `Token ${JwtService.getToken()}`;
    },

    removeHeader() {
        Vue.axios.defaults.headers.common['Authorization'] = null;
    },

    get(resource, id = "") {
        return Vue.axios.get(`${resource}/${id}`);
    },

    post(resource, params) {
        return Vue.axios.post(`${resource}/`, params);
    },

    postDetail(resource, id = "", params) {
        debugger;
        return Vue.axios.post(`${resource}/${id}/`, params);
    },

    update(resource, slug, params) {
        return Vue.axios.put(`${resource}/${slug}`, params);
    },

    put(resource, params) {
        return Vue.axios.put(`${resource}`, params);
    },

    delete(resource) {
        return Vue.axios.delete(resource).catch(error => {
          throw new Error(`ApiService ${error}`);
        });
    }
};

export default ApiService;