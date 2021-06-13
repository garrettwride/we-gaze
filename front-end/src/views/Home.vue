<template>
<div class="home">
  <MyParties v-if="user" />
  <Intro v-else />
</div>
</template>

<script>
import MyPhotos from '@/components/MyParties.vue';
import Login from '@/components/Intro.vue';
import axios from 'axios';
export default {
  name: 'Home',
  components: {
    MyParties,
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
