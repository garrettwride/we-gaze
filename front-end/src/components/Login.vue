<template>
    <div class="login">
        <h2>Login</h2>
        <form>
            <fieldset>
                <input placeholder="username" v-model="usernameLogin">
                <input type="password" placeholder="password" v-model="passwordLogin">
            </fieldset>
            <fieldset>
                <button type="submit" @click.prevent="login">Login</button>
            </fieldset>
        </form>
        <p v-if="errorLogin" class="error">{{errorLogin}}</p>
    </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Login',
  props: {
    logging: Boolean
  },
  data() {
    return {
      usernameLogin: '',
      passwordLogin: '',
      error: '',
      errorLogin: '',
    }
  },
  methods: {
    async login() {
      this.error = '';
      this.errorLogin = '';
      if (!this.usernameLogin || !this.passwordLogin)
        return;
      try {
        let response = await axios.post('/api/users/login', {
          username: this.usernameLogin,
          password: this.passwordLogin,
        });
        this.$root.$data.user = response.data.user;
        this.$emit('close');
      } catch (error) {
        this.errorLogin = "Error: " + error.response.data.message;
        this.$root.$data.user = null;
      }
    },
  }
}
</script>
