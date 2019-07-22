import {
    CONNECT_LOBBY,
    CONNECT_LOBBY_BY_ID,
    GET_DATA_LOBBY,
    GET_RESULT_LOBBY,
    CREATE_LOBBY
} from "@/store/actions.type";
import ApiService from "@/api/index";


const actions = {
    [GET_DATA_LOBBY](state, lobby_id) {
        return new Promise((resolve, reject) => {

            ApiService.get('lobby', lobby_id)
                .then(({data}) => {
                    resolve(data)
                })
                .catch(({response}) => {
                    reject(response.data)
                })
        })
    },
    [GET_RESULT_LOBBY](state, lobby_id) {
        return new Promise((resolve, reject) => {
            ApiService.get('lobby/result', lobby_id)
                .then(({data}) => {
                    resolve(data)
                })
                .catch(({response}) => {
                    reject(response.data)
                })
        })
    },
    [CONNECT_LOBBY_BY_ID](state, data) {
        return new Promise((resolve, reject) => {
            ApiService.postDetail('lobby/connect', data.id, { bet: data.bet })
                .then(({data}) => {
                    resolve(data)
                })
                .catch(({response}) => {
                    reject(response.data)
                })
        })
    },
    [CONNECT_LOBBY](state, data) {
        return new Promise((resolve, reject) => {
            ApiService.post('lobby/connect', { bet: data.bet })
                .then(({data}) => {
                    resolve(data)
                })
                .catch(({response}) => {
                    reject(response.data)
                })
        })
    },
    [CREATE_LOBBY](state) {
        return new Promise((resolve, reject) => {
            ApiService.post('lobby/create')
                .then(({data}) => {
                    resolve(data)
                })
                .catch(({response}) => {
                    reject(response.data)
                })
        })
    }
};

export default {
    actions,
}