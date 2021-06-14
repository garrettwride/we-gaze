<template>
    <div class="dashboard">
        <div class="nearby">
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
      show: false,
      partiesNearby: [],
      error: '',}
  },
  created() {
    this.getPartiesNearby();
  },

  computed: {
    user() {
      return this.$root.$data.user;
    },
  },
  methods: {
    
    async getPartiesNearby() {
      try {
        this.response = await axios.get("/api/parties/nearby");
        this.partiesNearby = this.response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
  }
}
</script>
