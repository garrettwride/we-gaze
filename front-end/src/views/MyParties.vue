<template>
    <div class="my-parties">
        <h2>My Gaze Parties</h2>
        <PartiesList :parties="parties" />
        <button @click="showCreate">Create New Gaze Party</button>
        <Create :show="show" @close="close" @createFinished="createFinished" />
    </div>
</template>

<script>
import axios from 'axios';
import Create from '@/components/Create.vue';
import PartiesList from '@/components/PartiesList.vue';
export default {
  name: 'MyParties',
  components: {
    Create,
    PartiesList
  },
  data() {
    return {
      show: false,
      parties: [],
      error: '',}
  },
  created() {
    this.getParties();
  },

  computed: {
    user() {
      return this.$root.$data.user;
    },
  },
  methods: {
    
    async getParties() {
      try {
        this.response = await axios.get("/api/parties");
        this.photos = this.response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    close() {
      this.show = false;
    },
    showCreate() {
      this.show = true;
    },
    async createFinished() {
      this.show = false;
      this.getParties();
    },

  }
}
</script>