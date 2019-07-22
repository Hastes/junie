import {
    MAKE_BET,
    GET_HASH
} from "../actions.type";
import ApiService from "@/api/index";

const state = {

};

const getters = {
    getBalance(state){
        return state.balance
    }
};

const actions = {
    [GET_HASH](state) {
        return new Promise(resolve => {
            ApiService.get('generator/get-hash')
                .then(({data}) => {
                    resolve(data)
                })

        })
    },
    [MAKE_BET](state, data) {
        return new Promise((resolve, reject) => {
            ApiService.post('generator/play', data)
                .then(({data}) => {
                    resolve(data)
            })
                .catch(({response}) => {
                    reject(response.data)
                })
        })
    }
};

const mutations = {

};

export default {
    state,
    getters,
    actions,
    mutations
}