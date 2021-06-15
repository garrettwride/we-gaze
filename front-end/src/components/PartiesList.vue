<template>
<div class="parties-list">
    <div class="party" v-for="party in parties" v-bind:key="party._id">
      <div class="partyInfo">
        <p class="partyTitle">{{party.title}}</p>
        <p class="partyName">{{party.user.firstName}} {{party.user.lastName}}</p>
        <p class="partyDate">{{formatDate(party.date)}}</p>
        <p class="partyLocation">{{party.location}}</p>
        <p class="partyParticipants">{{party.participants.length}}</p>
        <button v-if="party.participants != user._id">RSVP</button>
      </div>
    </div>
</div>
</template>

<script>
  import moment from 'moment';

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
        }
    }
}
</script>