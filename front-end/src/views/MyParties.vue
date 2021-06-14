<script>
import axios from 'axios';
import Uploader from '@/components/Create.vue';
import ImageGallery from '@/components/PartiesList.vue';
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
    async logout() {
      try {
        await axios.delete("/api/users");
        this.$root.$data.user = null;
      } catch (error) {
        this.$root.$data.user = null;
      }
    },
    async getPhotos() {
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