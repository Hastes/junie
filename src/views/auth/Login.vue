<template>
    <div class="login">
        <h1>Вход в систему</h1>
        <Socials/>
        <form method="POST" v-on:submit.prevent="onSubmit">
            <p>
                <label for="username">Логин: </label>
                <input v-model="username" id="username" type="text" name="username"/>
            </p>
            <p>
                <label for="password">Пароль: </label>
                <input v-model="password" id="password" type="password" name="password"/>
            </p>
            <p>
                <button type="submit">Вход</button>
            </p>
        </form>
        <ul v-if="errors" class="error-messages">
            <li v-for="(v, k) in errors" :key="k">{{ k }} {{ v | error }}</li>
        </ul>

        <router-view></router-view>
    </div>
</template>

<script>
    import { mapState } from "vuex";
    import { LOGIN } from '@/store/actions.type'
    import Socials from './socials/Socials';
    // import router from "@/router";

    export default {
        name: "Login",
        components: { Socials },
        data() {
            return {
                username: null,
                password: null,
            };
        },
        methods: {
            onSubmit() {
                this.$store
                    .dispatch(LOGIN, {
                        username: this.username,
                        password: this.password
                    })
                    .then(() => this.$router.push('/profile'))
            },
        },
        computed: {
        ...mapState({
                errors: state => state.auth.errors,
            })
        }
    }
</script>

<style scoped>

</style>