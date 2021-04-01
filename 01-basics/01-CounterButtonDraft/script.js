import Vue from './vendor/vue.esm.browser.js';

new Vue({
  el: '#app',
  data() {
    return {
      count: 0,
    };
  },

  methods: {
    increaseCount() {
      this.count++;
    },
  },
});
