<template>
    <div v-if="show" class="create">
        <form @submit.prevent="create">
            <fieldset>
                <input v-model="title" placeholder="Title">
            </fieldset>
            <fieldset>
                <textarea v-model="description" placeholder="Description"></textarea>
            </fieldset>
            <fieldset>
                <input v-model="date" placeholder="Date of Gaze Party">
            </fieldset>
            <fieldset>
                <input v-model="location" placeholder="Location">
            </fieldset>
            <fieldset>
                <input v-model="city" placeholder="City">
            </fieldset>
            <fieldset class="buttons">
                <button type="button" @click="close">Close</button>
                <button type="submit">Create</button>
            </fieldset>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Create',
  props: {
    show: Boolean,
  },
  data() {
    return {
      title: '',
      description: '',
      date: '',
      location: '',
      city: '',
      error: '',
    }
  },
  methods: {
  close() {
    this.$emit('close');
  },
  async create() {
      try {
        const formData = new FormData();
        formData.append('location', this.location);
        formData.append('city', this.city);
        formData.append('date', this.date);
        formData.append('title', this.title);
        formData.append('description', this.description);
        await axios.post("/api/parties", formData);
        this.location = "";
        this.city = "";
        this.date = "";
        this.title = "";
        this.description = "";
        this.$emit('createFinished');
      } catch (error) {
        this.error = "Error: " + error.response.data.message;
      }
    }
}
}
</script>