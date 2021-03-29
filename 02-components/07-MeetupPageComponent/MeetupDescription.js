export default {
  name: 'MeetupDescription',
  props: {
    description: String,
  },
  template: `<p v-if="description" class="meetup-description">{{description}}</p>`,
};
