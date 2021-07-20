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
        // if (!this.value) return '';
        if (this.type === 'date') {
          return this.getDateString();
        } else if (this.type === 'time') {
          return this.getTimeString();
        } else {
          return this.value;
        }
        //
        // let date = new Date(this.value);
        //
        // if (this.type === 'date') {
        //   return date.toISOString().split('T')[0];
        // }
        // if (this.type === 'time') {
        //   if (this.step && this.step % 60 !== 0) {
        //     return date.toISOString().split('T')[1].split('.')[0];
        //   } else {
        //     return date.toISOString().split('T')[1].split('.')[0].slice(0, 5);
        //   }
        // }
        // if (this.type === 'datetime-local') {
        //   return date.toISOString().split('.')[0];
        // }
      },
      set(value) {
        if (this.type === 'date') {
          this.setValueFromDate(value);
        } else if (this.type === 'time') {
          this.setValueFromTime(value);
        }

        // let date;
        // if (this.type === 'date') {
        //   date = new Date(Date.parse(value + 'Z'));
        // } else if (this.type === 'time') {
        //   date = new Date(0);
        //   const valueArr = value.split(':');
        //   date.setUTCHours(valueArr[0], valueArr[1]);
        //   valueArr[2] ? date.setUTCSeconds(valueArr[2]) : '';
        // }
        // if (this.type === 'datetime-local') {
        //   date = new Date(value + 'Z');
        // }
        //
        // // this.$emit('change', +date);
        // if (typeof value === 'number') {
        //   this.$emit('change', +date);
        // } else if (typeof value === 'string') {
        //   this.$emit('change', date);
        // } else {
        //   this.$emit('change', date);
        //   // this.$emit('change', date.toISOString().split('T')[0]);
        // }
      },
    },
    listeners() {
      return {
        ...this.$listeners,
        change: () => null,
        // change: ($event) => {
        //   let date;
        //   if (this.type === 'date') {
        //     date = Date.parse($event.target.value + 'Z');
        //   } else if (this.type === 'time') {
        //     date = new Date(0);
        //     const valueArr = $event.target.value.split(':');
        //     date.setUTCHours(valueArr[0], valueArr[1]);
        //     valueArr[2] ? date.setUTCSeconds(valueArr[2]) : '';
        //   }
        //   if (this.type === 'datetime-local') {
        //     date = new Date($event.target.value).toISOString();
        //   }
        //
        //   // this.$emit('change', +date);
        //   if (typeof this.value === 'number') {
        //     this.$emit('change', +date);
        //   } else if (typeof this.value === 'string') {
        //     this.$emit('change', $event.target.value);
        //   } else {
        //     this.$emit('change', date);
        //     // this.$emit('change', date.toISOString().split('T')[0]);
        //   }
        // },
      };
    },
  },
  methods: {
    getDateString() {
      return new Date(this.value).toISOString().split('T')[0];
    },
    setValueFromDate(value) {
      let eventValue;

      if (typeof this.value === 'number') {
        eventValue = +new Date(value);
      } else if (typeof this.value === 'string') {
        eventValue = value;
      } else {
        eventValue = new Date(value);
      }

      this.$emit('change', eventValue);
    },
    getTimeString() {
      const date = new Date(this.value);
      const hours = date.getUTCHours() > 9 ? `${date.getUTCHours()}` : `0${date.getUTCHours()}`;
      const minutes = date.getUTCMinutes() > 9 ? `${date.getUTCMinutes()}` : `0${date.getUTCMinutes()}`;

      return `${hours}:${minutes}`;
    },
    setValueFromTime(value) {
      let eventValue;
      const [hours, minutes] = value.split(':');
      const date = new Date(this.value);

      date.setUTCHours(+hours);
      date.setUTCMinutes(+minutes);

      if (typeof this.value === 'number') {
        eventValue = +date;
      } else {
        eventValue = date;
      }

      this.$emit('change', eventValue);
    },
  },

  components: { AppInput },
};
</script>
