<template>
    <div class="vk">
        <button v-on:click="vkGetAuth">VK</button>
    </div>
</template>

<script>
    import VK_AUTH_PARAMS from '@/api/social/VK_AUTH_PARAMS';

    export default {
        name: "VK",
        methods: {
            vkGetAuth() {
                const params = VK_AUTH_PARAMS;
                const query = Object.keys(params).map(function(k) {
                    return encodeURIComponent(k) + '=' + encodeURIComponent(params[k])
                }).join('&');
                const url = 'https://oauth.vk.com/authorize?' + query;
                window.location.replace(url)
            }
        }
    }
</script>

<style scoped>

</style>
