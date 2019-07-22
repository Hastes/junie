<template>
    <div class="lobby">
        <div class="hash">
            {{ hash }}
        </div>
        <div class="players">
            <ul>
                <li v-for="bet in bets" :key="bet.pk">
                    <Player :avatar="bet.avatar" :name="bet.username" :bet="bet.bet" />
                </li>
            </ul>
        </div>
        <div class="counter">
            До конца игры: 60 секунд
        </div>
        <div class="lobby-cash">
            <h1>Общая ставка {{ full_cash }} р.</h1>
        </div>

        <div class="status">
            <p>Статус</p>
            <span v-if="is_done">Игра закончена</span><span v-else>Игра еще не началась</span>
            <button v-on:click="getResult">Получить результат</button>
            <div class="result" v-if="result">
                {{ result }}
            </div>
            <hr>
        </div>

        <div class="connect-config">
            <label for="bet">Ставка</label>
            <input id="bet" type="number" v-model="bet"/>
            <button v-on:click="connectLobby">Сделать ставку</button>
            <p>Шанс на победу: 10%</p>
        </div>

        <div class="error" v-if="error">{{ error }}</div>
    </div>
</template>

<script>
    import Player from './Player'
    import {
        GET_DATA_LOBBY,
        GET_RESULT_LOBBY,
        CONNECT_LOBBY_BY_ID
    } from '@/store/actions.type'

    export default {
        name: "Game",
        components: {Player},
        data() {
            return {
                bets: [],
                hash: null,
                is_done: null,
                start_game: null,
                result: null,
                error: null,
                bet: 1,
                full_cash: 0
            }
        },
        created() {
            this.loadInfo()
        },
        methods: {
            loadInfo() {
                this.$store.dispatch(GET_DATA_LOBBY, this.$route.params.id)
                    .then((data)=> {
                        this.hash = data.hash;
                        this.bets = data.bets;
                        this.is_done = data.is_done;
                        this.start_game = data.start_game;
                        this.full_cash = data.full_cash
                    })
                    .catch((error) => {
                        this.error = error
                    })
            },
            getResult() {
               this.$store.dispatch(GET_RESULT_LOBBY, this.$route.params.id)
                    .then((data)=> {
                        this.result = data.result;
                    })
                    .catch((error) => {
                        this.error = error
                    })
            },
            connectLobby() {
                this.$store.dispatch(CONNECT_LOBBY_BY_ID, {
                    id : this.$route.params.id,
                    bet: this.bet
                })
                    .then((data)=> {
                        debugger;
                        this.hash = data.hash;
                    })
                    .catch((error) => {
                        this.error = error
                    })
            }
        }
    }
</script>

<style scoped>

</style>