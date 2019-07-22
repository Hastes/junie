<template>
    <div class="lobby-panel">
        <p><button v-on:click="createLobby">Создать лобби</button></p>
        <p>
            <label for="lobbyId">Лобби ID: </label>
            <input id="lobbyId" type="text" v-model="lobby_id"/>
            <button v-on:click="connectById">Присоедениться по id</button>
        </p>
        <button v-on:click="findLobby">Найти игру</button>
        <div class="error" v-if="error">
            <h5>{{ error }}</h5>
        </div>
    </div>
</template>

<script>
    import {
        CONNECT_LOBBY,
        CONNECT_LOBBY_BY_ID,
        CREATE_LOBBY
    } from "@/store/actions.type";

    export default {
        name: "Panel",
        data() {
            return {
                lobby_id: null,
                error: null
            }

        },
        methods: {
            createLobby() {
                this.$store.dispatch(CREATE_LOBBY)
                    .then((data) => {
                        this.$router.push({ name: 'lobby-detail', params: {id: data.lobby_id}})
                    })
            },
            connectById() {
                this.$store.dispatch(CONNECT_LOBBY_BY_ID, {
                    id : this.lobby_id,
                    bet: 1
                })
                    .then(()=> {
                        this.$router.push({ name: 'lobby-detail', params: {id: this.lobby_id}})
                    })
                    .catch((error) => {
                        this.error = error
                    })
            },
            findLobby() {
                this.$store.dispatch(CONNECT_LOBBY, {
                    bet: 1
                })
                    .then((data)=> {
                        this.$router.push({ name: 'lobby-detail', params: {id: data.pk}})
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
