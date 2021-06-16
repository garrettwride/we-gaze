<template>
  <div id="app">
    <header id="header">
      <h1>We Gaze</h1>
      <nav>
        <router-link to="/" >Home</router-link>
        <router-link v-if="user" to="/MyParties">My Parties</router-link>
      </nav>
      <button v-if="user" @click="logout">Logout</button>
    </header>
    <router-view/>
    <footer>
      <p>20 Hours</p>
      <a href="https://github.com/garrettwride/we-gaze.git" target="_blank">GitHub</a>
    </footer>
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
/*--magnolia>: #ecefffff;
--middle-blue-purple: #8576b7ff;
--rose-dust: #9c5b63ff;
--maximum-blue-purple: #afa6e7ff;
--oxford-blue: #05152fff;/\*/

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #ecefffff;
  background-image: url("/public/images/sky.jpeg");
  font-family: 'Josefin Sans', sans-serif;
}

header {
  padding-top: 30px;
  font-size: 1.2em;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  text-decoration: none;
  color: #8576b7ff;
  padding: 15px;
  font-size: 1.2em;
}

nav a.router-link-exact-active {
  color: #afa6e7ff;
}

button {
  font-family: 'Josefin Sans', sans-serif;
  padding: 10px;
  border-radius: 25px;
  background-color: #afa6e7ff;
  color: #05152fff;
}

fieldset {
  border: none;
}

input, textarea {
  background-color: #ecefffff;
}

footer {
    text-align: center;
    padding: 15px;
    background-color: #8576b7ff;
    bottom: 0;
    width: 100%;
    color: #ecefffff;
}

footer a {
  text-decoration: none;
  color: #ecefffff;
}

footer p {
  padding-bottom: 10px;
}

@media (min-width: 1140px) {
  
body {
  display: flex;
  justify-content: center;
  background-color: #afa6e7ff;
}

  #app {
    width: 1140px;
  }
}

</style>
