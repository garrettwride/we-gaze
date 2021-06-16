<template>
    <div class="signup">
        <h2>Sign Up</h2>
        <form>
            <fieldset>
                <input placeholder="first name" v-model="firstName">
                <input placeholder="last name" v-model="lastName">
            </fieldset>
            <fieldset>
                <input placeholder="username" v-model="username">
                <input type="password" placeholder="password" v-model="password">
            </fieldset>
            <fieldset>
                <button type="submit" @click.prevent="register">Register</button>
            </fieldset>
            </form>
        <p v-if="error" class="error">{{error}}</p>
    </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'HomePage',
  data() {
    return {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      error: '',
    }
  },
  methods: {
    async register() {
      this.error = '';
      this.errorLogin = '';
      if (!this.firstName || !this.lastName || !this.username || !this.password)
        return;
      try {
        let response = await axios.post('/api/users', {
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username,
          password: this.password,
        });
        this.$root.$data.user = response.data.user;
        this.$emit('close');
      } catch (error) {
        this.error = error.response.data.message;
        this.$root.$data.user = null;
      }
    },
  }

}
</script>

<style scoped>

input {
  padding: 8px;
  margin: 20px
}

@media (min-width: 960px) {
  .signup {
    margin-top: 200px;
    margin-bottom: 0;
  }
}

</style>
