<template>
<div class="home">
  <GazeParties v-if="user" />
  <Intro v-else />
</div>
</template>

<script>
import GazeParties from '@/components/GazeParties.vue';
import Intro from '@/components/Intro.vue';
import axios from 'axios';
export default {
  name: 'Home',
  components: {
    GazeParties,
    Intro,
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
  }
}
</script>
