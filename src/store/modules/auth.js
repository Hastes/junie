import {
    USER_DATA,
    LOGIN,
    LOGOUT,
    REGISTER,
    SOCIAL_AUTH
} from '../actions.type';

import {
    SET_AUTH,
    SET_ERROR,
    PURGE_AUTH,
    SET_USER, SET_BALANCE
} from "../mutations.type";

import ApiService from "@/api/index";
import JwtService from "@/api/jwt.service.js";

const state = {
    errors: null,
    user: {},
    isAuthenticated: false,
    userIsReady: false,
    balance: null,
};

const getters = {
    currentUser(state) {
        return state.user
    },
    isAuthenticated(state) {
        return state.isAuthenticated
    },
    userIsReady(state) {
        return state.userIsReady
    }
};

const actions = {
    [LOGIN](context, creds) {
        return new Promise(resolve => {
            ApiService.post("rest-auth/login", creds)
                .then(({data})=> {
                    context.commit(SET_AUTH, data.key);
                    resolve(data);
                })
                .catch(({ response }) => {
                    context.commit(SET_ERROR, response.data)
                })
        })
    },
    [SOCIAL_AUTH](context, creds) {
        return new Promise(resolve => {
            ApiService.post("rest-auth/vk", creds)
                .then(({data})=> {
                    context.commit(SET_AUTH, data.key);
                    resolve(data);
                    debugger;
                })
                .catch(({ response }) => {
                    context.commit(SET_ERROR, response.data)
                })
        })
    },
    [USER_DATA](context) {
        if (JwtService.getToken()) {
            ApiService.setHeader();
            ApiService.get("rest-auth/user")
                .then(({data}) => {
                    context.commit(SET_USER, data);
                    context.commit(SET_BALANCE, data.balance)
                })
                .catch(({ response }) => {
                    context.commit(SET_ERROR, response.data);
                })
        } else {
            context.commit(PURGE_AUTH)
        }
    },
    [REGISTER](context, data) {
        return new Promise(resolve => {
            ApiService.post('rest-auth/registration', data)
                .then(({data}) => {
                    context.commit(SET_AUTH, data.key);
                    resolve(data)
                })
                .catch(({response}) => {
                    context.commit(SET_ERROR, response.data)
                })
        })
    },
    [LOGOUT](context) {
        ApiService.post('rest-auth/logout');
        context.commit(PURGE_AUTH);
    }
};

const mutations = {
    [SET_AUTH](state, token) {
        state.errors = {};
        ApiService.removeHeader();
        JwtService.saveToken(token);
        state.isAuthenticated = true;
    },
    [SET_USER](state, user) {
        state.errors = {};
        state.user = user;
        state.userIsReady = true;
        state.isAuthenticated = true;
    },
    [PURGE_AUTH](state) {
        state.user = {};
        state.errors = {};
        ApiService.removeHeader();
        JwtService.destroyToken();
        state.isAuthenticated = false;
        state.balance = null;
    },
    [SET_ERROR](state, error) {
        JwtService.destroyToken();
        state.errors = error;
    },
    [SET_BALANCE](state, balance) {
        state.balance = balance;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};