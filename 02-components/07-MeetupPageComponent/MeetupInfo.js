export default {
  name: 'MeetupInfo',
  props: {
    place: {
      type: String,
      required: true,
    },
    organizer: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  computed: {
    dateOnlyString() {
      return this.date.toISOString().split('T')[0];
    },
    localDate() {
      return this.date.toLocaleString(navigator.language, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    },
  },

  template: `
    <ul class="info-list">
      <li>
        <img class="icon info-list__icon" alt="icon" src="/assets/icons/icon-user.svg" />
        {{ organizer }}
      </li>
      <li>
        <img class="icon info-list__icon" alt="icon" src="/assets/icons/icon-map.svg" />
        {{ place }}
      </li>
      <li>
        <img class="icon info-list__icon" alt="icon" src="/assets/icons/icon-cal-lg.svg" />
        <time :datetime="dateOnlyString">{{ localDate }}</time>
      </li>
    </ul>`,
};
