<template>
    <div class="logout">
        <form method="POST" v-on:submit.prevent="onSubmit">
            <button type="submit">Выйти</button>
        </form>
        <ul v-if="errors" class="error-messages">
            <li v-for="(v, k) in errors" :key="k">{{ k }} {{ v | error }}</li>
        </ul>
    </div>
</template>

<script>
    import { mapState } from "vuex";
    import { LOGOUT } from "@/store/actions.type";
    import router from "@/router";

    export default {
        name: "Logout",
        methods: {
            onSubmit() {
                this.$store.dispatch(LOGOUT)
                router.push('/login')
            }
        },
        computed: {
            ...mapState({
                errors: state => state.auth.errors
            })
        }
    }
</script>

<style scoped>

</style>