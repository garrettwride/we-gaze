<template>
    <div class="dashboard">
        <div class="nearby">
            <h2>Gaze Parties Near You</h2>
            <form>
                <legend>Enter U.S. city:</legend>
                <input v-model="city">
                <button type="submit" @click.prevent="getPartiesNearby">Submit</button>
            </form>
            <PartiesList v-bind:showParticipants="false" :parties="partiesNearby" @getPartiesNearby="getPartiesNearby" @getParties="getParties"/>
        </div>
        <div class="attending">
            <h2>Gaze Parties You're Planning on Attending</h2>
            <PartiesList :parties="parties" @getPartiesNearby="getPartiesNearby" @getParties="getParties" v-bind:showParticipants="true"/>
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
      parties: [],
      partiesNearby: [],
      error: '',}
  },
  async created() {
    try {
        this.response = await axios.get("/api/parties/");
        this.parties = this.response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
  },

  computed: {
    user() {
      return this.$root.$data.user;
    },
  },
  methods: {
    async getPartiesNearby() {
      this.city = this.city.toLowerCase();
      try {
        this.response = await axios.get("/api/parties/" + this.city);
        this.partiesNearby = this.response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    async getParties() {
      try {
        this.response = await axios.get("/api/parties/");
        this.parties = this.response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
  }
}
</script>

<style scoped>

h2 {
    margin: 30px;
    margin-top: 40px;
}

legend {
    margin: 5px;
    padding-right: 20px;
}

input {
    padding: 7px;
    margin-right: 12px;
    margin-bottom: 20px;;
}

.attending h2 {
    margin-top: 50px;
}

</style>
