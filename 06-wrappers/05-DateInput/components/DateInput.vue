<template>
  <app-input v-model="computedValue" v-bind="$attrs" v-on="listeners" :type="type" :step="step">
    <template v-for="slotName in Object.keys($slots)" #[slotName]>
      <slot :name="slotName" />
    </template>
  </app-input>
</template>

<script>
import AppInput from './AppInput';

export default {
  name: 'DateInput',
  inheritAttrs: false,
  props: {
    type: {
      type: String,
      default: 'date',
    },
    step: null,
    value: [Number, String, Date],
  },
  model: {
    prop: 'value',
    event: 'change',
  },
  computed: {
    computedValue: {
      get() {
        if (!this.value) return '';

        if (this.type === 'date') {
          return this.dateString;
        } else if (this.type === 'time') {
          return this.timeString;
        } else {
          return this.localDateString;
        }
      },
      set(value) {
        if (this.type === 'date') {
          this.setValueFromDate(value);
        } else if (this.type === 'time') {
          this.setValueFromTime(value);
        } else {
          this.setValueFromDatetimeLocalString(value);
        }
      },
    },

    dateString() {
      return new Date(this.value).toISOString().split('T')[0];
    },

    timeString() {
      const date = new Date(this.value);
      const hours = date.getUTCHours() > 9 ? `${date.getUTCHours()}` : `0${date.getUTCHours()}`;
      const minutes = date.getUTCMinutes() > 9 ? `${date.getUTCMinutes()}` : `0${date.getUTCMinutes()}`;

      if(!this.step || this.step % 60 === 0) {
        return `${hours}:${minutes}`;
      }

      const seconds= date.getUTCSeconds() > 9 ? `${date.getUTCSeconds()}` : `0${date.getUTCSeconds()}`;
      return `${hours}:${minutes}:${seconds}`;
    },

    localDateString() {
      const date = new Date(this.value);

      return date.toISOString().slice(0, 16);
    },

    listeners() {
      return {
        ...this.$listeners,
        change: () => null,
      };
    },
  },

  methods: {
    setValueFromDate(value) {
      let eventValue;
      let date = new Date(value)

      if(!this.isValidDate(date)) {
        this.$emit('change', null);
        return
      }

      if (typeof this.value === 'number') {
        eventValue = +date
      } else if (typeof this.value === 'string') {
        eventValue = value;
      } else {
        eventValue = date;
      }

      this.$emit('change', eventValue);
    },

    setValueFromTime(value) {
      let eventValue;
      const [hours, minutes, seconds] = value.split(':');
      const date = new Date(this.value);

      date.setUTCHours(+hours);
      date.setUTCMinutes(+minutes);
      if(seconds) {
        date.setUTCSeconds(+seconds);
      } else if(this.step % 60 !== 0) {
        date.setUTCSeconds(0);
      }

      if (typeof this.value === 'number') {
        eventValue = +date;
      } else {
        eventValue = date;
      }

      this.$emit('change', eventValue);
    },

    setValueFromDatetimeLocalString(value) {
      let eventValue;

      if(typeof this.value === 'number') {
        eventValue = +new Date(value + 'z');
      } else {
        eventValue = new Date(value + 'z')
      }

      this.$emit('change', eventValue);
    },

    isValidDate(date) {
      return date instanceof Date && !isNaN(date);
    }
  },

  components: { AppInput },
};
</script>
