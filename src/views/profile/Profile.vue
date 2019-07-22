<template>
    <div class="profile">
        <div v-if="isAuthenticated">
            <div class="fields">
                <h2>{{ login }}</h2>
                <h2>{{ first_name }}</h2>
                <h2>{{ last_name }}</h2>
            </div>
            <Balance />
            <div class="actions">
                <Logout />
            </div>
            <div class="game">
                <Generator />
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import Logout from '@/views/auth/Logout';
    import Generator from '@/views/games/generator/Game'
    import Balance from '@/views/profile/Balance'


    export default {
        name: "Profile",
        components: { Logout, Generator, Balance },
        computed: {
            ...mapState({
                login: state => state.auth.user.username,
                first_name: state => state.auth.user.first_name,
                last_name: state => state.auth.user.last_name,
                isAuthenticated: state => state.auth.isAuthenticated
            })
        }
    }
</script>

<style scoped>

</style>