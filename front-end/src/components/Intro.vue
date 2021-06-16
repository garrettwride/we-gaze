<template>
    <div class="intro">
        <h2>Start Your Stargazing Adventure...</h2>
        <button @click="login">Login</button>
        <button @click="signUp">Sign Up</button>
    </div>
</template>

<script>
    export default {
        name: 'Intro',
        prop: {
            logging: Boolean,
            signing: Boolean,
        },
        methods: {
            login() {
                this.$emit('login');
            },
            signUp() {
                this.$emit('signUp');
            },
        }
    }
</script>

<style scoped>

button {
    margin: 20px;
}

</style>