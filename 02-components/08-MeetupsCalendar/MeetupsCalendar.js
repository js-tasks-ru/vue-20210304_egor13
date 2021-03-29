import {getFreshDays} from './data.js';

export const MeetupsCalendar = {
  name: 'MeetupsCalendar',
  props: {
    meetups: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      date: new Date(),
      currentMonth: null,
      currentYear: null,
    }
  },
  computed: {
    month() {
      return this.date.toLocaleString(navigator.language, {
        month: 'long',
      });
    },
    year() {
      return this.date.toLocaleString(navigator.language, {
        year: 'numeric',
      })
    },
    preparedDays() {
      let result = getFreshDays(this.date).map(day => {
        const dayMeetups = this.meetups.filter(meetup => day.date.getDate() === new Date(meetup.date).getDate())
        return {
          ...day,
          meetups: dayMeetups.length ? dayMeetups : null,
        }
      })
      return result
    },
  },
  methods: {
    increaseMonth() {
      const newMonth = this.date.getMonth() + 1;
      this.date = new Date(this.date.setMonth(newMonth));
    },
    decreaseMonth() {
      const newMonth = this.date.getMonth() - 1;
      this.date = new Date(this.date.setMonth(newMonth));
    },
  },

  template: `<div class="rangepicker">
    <div class="rangepicker__calendar">
      <div class="rangepicker__month-indicator">
        <div class="rangepicker__selector-controls">
          <button class="rangepicker__selector-control-left" @click="decreaseMonth"></button>
          <div>{{ month }} {{ year }}</div>
          <button class="rangepicker__selector-control-right" @click="increaseMonth"></button>
        </div>
      </div>
      <div class="rangepicker__date-grid">

        <div 
          v-for="day in preparedDays"
          class="rangepicker__cell" 
          :class="{ rangepicker__cell_inactive: !day.isActive}"
        >
          {{day.dateDay}}
          <template v-if="day.meetups">
            <a 
              v-for="meetup in day.meetups"
              class="rangepicker__event"
            >
              {{ meetup.title }}
            </a>
          </template>
        </div>
      </div>
    </div>
  </div>`,
};
