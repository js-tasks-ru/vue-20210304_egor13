import Vue from './vendor/vue.esm.browser.js';

new Vue({
    data() {
        return {
            count: 0,
        }
    },
    methods: {
        increaseCount() {
            this.count++;
        }
    },
    el: '#app',
});
