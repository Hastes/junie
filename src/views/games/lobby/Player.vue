<template>
    <div class="lobby-player">
        <p>Аватар: {{ avatar }}</p>
        <p>Имя: {{ name }}</p>
        <p>Ставка: {{ bet }}</p>
    </div>
</template>

<script>
    export default {
        name: "Player",
        props: {
            avatar: String,
            name: String,
            bet: Number
        }
    }
</script>

<style scoped>

</style>