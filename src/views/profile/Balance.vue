<template>
    <h4 class="balance-block">Баланс: {{ formattedBalance }} руб.</h4>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        name: "Balance",
        computed: {
            ...mapState({
                balance: state => state.auth.balance,
            }),
            formattedBalance: (data) => {
                return Math.round(data.balance * 100) / 100
            }
        }
    }
</script>

<style scoped>

</style>