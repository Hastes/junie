<template>
    <div class="generator-game">
        <div class="game result">
            <p>{{ result }}</p>
        </div>
        <div class="bet-block">
            <p>
                <label for="bet">Ставка</label>
                <input id="bet" type="text" name="bet" v-model="game.bet"/>
            </p>
            <p>Шанс выиграша: {{ chancePercents }}%</p>
            <p>Выигрыш: {{ winCash }}</p>
        </div>
        <div class="config-game-block">
            <p>Общий диапазон от 0 до 999999</p>
            <p>
                <label for="limit_1">От</label>
                <input id="limit_1" type="text" name="limit_1" v-model="game.limit_1"/>
            </p>
            <p>
                <label for="limit_2">До</label>
                <input id="limit_2" type="text" name="limit_2" v-model="game.limit_2"/>
            </p>
        </div>
        <div class="hash">
            <div v-if="hash">
                <p>{{ hash }}</p>
            </div>
        </div>
        <div class="bet">

            <button v-on:click="play">Играть</button>
        </div>
        {{ error }}
    </div>
</template>

<script>
    import {
        MAKE_BET,
        GET_HASH
    } from '@/store/actions.type'
    import {SET_BALANCE} from "@/store/mutations.type";


    export default {
        name: "Game",
        data() {
            return {
                game: {
                    bet: 1,
                    limit_1: 0,
                    limit_2: 50000,
                },
                hash: null,
                result: null,
                error: null
            }
        },
        created() {
            this.get_hash()
        },
        methods: {
            play() {
                this.$store.dispatch(MAKE_BET, this.game)
                    .then((data) => {
                        this.result = data.result;
                        this.hash = data.next_hash;
                        this.$store.commit(SET_BALANCE, data.balance);
                    })
                    .catch((data) => {
                        this.error = data
                    })
            },
            get_hash() {
                this.$store.dispatch(GET_HASH)
                    .then((data) => {
                        this.hash = data.hash
                    })
            }
        },
        computed: {
            chance: (data) => {
                return (data.game.limit_2 - data.game.limit_1) / 999999
            },
            chancePercents: (data) => {
                return Math.round(data.chance * 100)
            },
            winCash: (data) => {
                return Math.round(data.game.bet / data.chance * 100) / 100
            }
        }
    }
</script>

<style scoped>

</style>
