<template>
<div class="home">
  <PartiesNearby v-if="user" />
  <Login logging @close="close" v-else-if="logging" />
  <SignUp signing @close="close" v-else-if="signing" />
  <Intro v-bind:logging="false" v-bind:signing="false" @login="login" @signUp="signUp" v-else />
</div>
</template>

<script>
import PartiesNearby from '@/components/PartiesNearby.vue';
import Intro from '@/components/Intro.vue';
import SignUp from '@/components/SignUp.vue';
import Login from '@/components/Login.vue';
import axios from 'axios';
export default {
  name: 'Home',
  components: {
    PartiesNearby,
    Intro,
    SignUp,
    Login
  },
  data() {
    return {
      logging: false,
      signing: false,
    }
  },
  async created() {
    try {
      let response = await axios.get('/api/users');
      this.$root.$data.user = response.data.user;
    } catch (error) {
      this.$root.$data.user = null;
    }
  },
  computed: {
    user() {
      return this.$root.$data.user;
    }
  },
  methods: {
    login() {
      this.logging = true;
    },
    signUp() {
      this.signing = true;
    },
    close() {
      this.signing = false;
      this.logging = false;
    }
  }
}
</script>

<style scoped>

.home {
  padding-bottom: 30px;
}

</style>
