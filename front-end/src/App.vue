<template>
  <div id="app">
    <header id="header">
      <h1>We Gaze</h1>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link v-if="user" to="/MyParties">My Parties</router-link>
      </nav>
      <button v-if="user" @click="logout">Logout</button>
    </header>
    <footer>
      <p>20 Hours</p>
      <a href="https://github.com/garrettwride/we-gaze.git">GitHub</a>
    </footer>
    <router-view />
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'App',
  computed: {
    user() {
      return this.$root.$data.user;
    },
  },
  methods: {
    async logout() {
      try {
        await axios.delete("/api/users");
        this.$root.$data.user = null;
      } catch (error) {
        this.$root.$data.user = null;
      }
    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;

}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: #42b983;
}

nav a.router-link-exact-active {
  color: #42b983;
}

footer {
    text-align: center;
    padding: 30px;
    background-color: #343636;
    position: fixed;
    bottom: 0;
    width: 100%;
    border-radius: 25px;
}

</style>
