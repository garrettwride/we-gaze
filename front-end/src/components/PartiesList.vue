<template>
<div class="parties-list">
    <div class="party" v-for="party in parties" v-bind:key="party._id">
      <div class="partyInfo">
        <p class="partyTitle">{{party.title}}</p>
        <p class="partyName">{{party.user.firstName}} {{party.user.lastName}}</p>
        <p class="partyDate">{{formatDate(party.date)}}</p>
        <p class="partyLocation">{{party.location}}</p>
        <p class="partyParticipants">{{party.participants.length}}</p>
        <button v-if="!isParticipating(party)" @click.prevent="addParticipant(party)">RSVP</button>
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
    parties: Array
  },
  computed: {
    user() {
    return this.$root.$data.user;
    }
  },
    methods: {
        formatDate(date) {
            if (moment(date).diff(Date.now(), 'days') < 15)
                return moment(date).fromNow();
            else
                return moment(date).format('d MMMM YYYY');
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
            for (i = 0; i <= party.participants.length; ++i) {
                if (party.participants[i] === this.$root.$data.user._id) {
                    return true;
                }
            }
            return false;
        }
    }
}
</script>