<template>
    <div class="loading"></div>
</template>

<script>
    import { SOCIAL_AUTH } from '@/store/actions.type'
    import router from '@/router'

    export default {
        name: "Callback",
        created() {
            const code = this.$route.query.code || null;
            if (code) this.socialAuth(code)
        },
        methods: {
            socialAuth(code) {
                this.$store
                    .dispatch(SOCIAL_AUTH, { code })
                    .then(() => {
                            // window.close()
                            router.push('/profile')
                        }
                    )
            }
        }
    }
</script>