<template>
<div class="parties-list">
    <div class="party" v-for="party in parties" v-bind:key="party._id">
      <div v-if="!showParticipants || isParticipating(party)" class="partyInfo">
        <h3 class="partyTitle">{{party.title}}</h3>
        <p class="partyName">Host: {{party.user.firstName}} {{party.user.lastName}}</p>
        <p class="partyDate">{{formatDate(party.date)}}</p>
        <p class="partyLocation">{{party.location}}</p>
        <p class="partyParticipants">Participants: {{party.participants.length}}</p>
        <p class="partyDescription">{{party.description}}</p>
        <button v-if="!isParticipating(party)" @click.prevent="addParticipant(party)">I'm Coming!</button>
        <button v-if="myParties" @click.prevent="deleteParty(party)">Delete</button>
        <button v-if="showParticipants" @click.prevent="removeParticipant(party)">Nevermind</button>
      </div>
    </div>
</div>
</template>

<script>
  import moment from 'moment';
  import axios from 'axios';

export default {
  name: 'PartiesList',
  props: {
    parties: Array,
    showParticipants: Boolean,
    myParties: Boolean
  },
  computed: {
    user() {
    return this.$root.$data.user;
    }
  },
    methods: {
        formatDate(date) {
            return moment(date).format('MMMM d YYYY');
        },
        async addParticipant(party){
            try {
                await axios.put("/api/parties/" + party._id);
                this.$emit('getPartiesNearby');
                return true;
            } catch (error) {
                console.log(error);
            }
        },
        isParticipating(party) {
            let i = 0;
            for (i = 0; i < party.participants.length; ++i) {
                if (party.participants[i] == this.$root.$data.user._id) {
                    return true;
                }
            }
            return false;
        },
        async deleteParty(party) {
            try {
                await axios.delete("/api/parties/" + party._id);
                this.$emit('getParties');
            } catch (error) {
                this.error = error.response.data.message;
            }
        },
        async removeParticipant(party){
            try {
                await axios.put("/api/parties/remove/" + party._id);
                this.$emit('getPartiesNearby');
                this.$emit('getParties');
                return true;
            } catch (error) {
                console.log(error);
            }
        },
    }
    
}
</script>

<style scoped>

p {
    padding: 5px;
}

.partyInfo {
    padding: 12px;
    margin: 25px;
    border: 5px double #9c5b63ff;
    border-radius: 25px;;
}

button {
    margin: 10px;
}

h3 {
    margin: 10px;
}

@media (min-width: 960px) {
    .party {
        padding-left: 100px;
        padding-right: 100px;
    }

}

</style>
