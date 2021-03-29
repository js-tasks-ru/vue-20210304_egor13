import MeetupView from './MeetupView.js';
import { MEETUP_ID, fetchMeetup } from './data.js';

export default {
  name: 'MeetupPage',
  data() {
    return {
        meetup: null,
    }
  }, 
  components: {
    MeetupView,
  },
  mounted() {
    fetchMeetup(MEETUP_ID)
      .then(meetup => this.meetup = meetup)
  },
  template: `<div>
    <meetup-view v-if="meetup" :meetup="meetup"/>
  </div>`,
};
