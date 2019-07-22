<template>
    <div class="register">
        <form method="POST" v-on:submit.prevent="onSubmit">
            <p>
                <label for="username">Логин: </label>
                <input v-model="username" id="username" type="text" name="username"/>
            </p>
            <p>
                <label for="email">Почта: </label>
                <input v-model="email" id="email" type="email" name="email"/>
            </p>
            <p>
                <label for="password1">Пароль: </label>
                <input v-model="password1" id="password1" type="password" name="password1"/>
            </p>
             <p>
                <label for="password2">Повторите пароль: </label>
                <input v-model="password2" id="password2" type="password" name="password2"/>
            </p>
            <button type="submit">Зарегистрироваться</button>
        </form>

        <ul v-if="errors" class="error-messages">
                <li v-for="(v, k) in errors" :key="k">{{ k }} {{ v }}</li>
            </ul>
    </div>
</template>

<script>
    import { REGISTER } from '@/store/actions.type';
    import { mapState } from "vuex";

    export default {
        name: "Register",
        data() {
            return {
                username: null,
                password1: null,
                password2: null,
                email: null
            }
        },
        methods: {
            onSubmit() {
                this.$store.dispatch(REGISTER, this._data)
            }
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
