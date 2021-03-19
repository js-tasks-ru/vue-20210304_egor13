import Vue from './vendor/vue.esm.browser.js';

new Vue({
    data() {
        return {
            id: 1,
            meetup: null,
        }
    },  
    watch: {
        id: {
            immediate: true,
            handler() {
                fetch(`https://course-vue.javascript.ru/api/meetups/${this.id}`)
                    .then(res => res.json())
                    .then(meetup => {
                        this.meetup = meetup
                });
            }
        }
    },
    el: '#app',
});
