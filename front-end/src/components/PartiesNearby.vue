<template>
    <div class="dashboard">
        <div class="nearby">
            <h2>Gaze Parties Near You</h2>
            <form>
                <legend>Enter U.S. city:</legend>
                <input v-model="city">
                <button type="submit" @click.prevent="getPartiesNearby">Submit</button>
            </form>
            <PartiesList :parties="partiesNearby"/>
        </div>
        <div class="attending">
            <PartiesList />
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import PartiesList from '@/components/PartiesList.vue';
export default {
  name: 'PartiesNearby',
  components: {
    PartiesList
  },
  data() {
    return {
      city: "",
      partiesNearby: [],
      error: '',}
  },
  created() {
    
  },

  computed: {
    user() {
      return this.$root.$data.user;
    },
  },
  methods: {
    
    async getPartiesNearby() {
      try {
        this.response = await axios.get("/api/parties/" + this.city);
        this.partiesNearby = this.response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
  }
}
</script>
