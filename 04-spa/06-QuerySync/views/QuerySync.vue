<template>
  <div class="">
    <meetups-view :view.sync="view" :date.sync="date" :participation.sync="participation" :search.sync="search" />
    <!-- <h1 @:update:view.sync="view">{{view}}</h1> -->
  </div>
</template>

<script>
import MeetupsView from '../components/MeetupsView';
import VueRouter from 'vue-router';
const { isNavigationFailure, NavigationFailureType } = VueRouter;

export default {
  name: 'QuerySync',

  components: { MeetupsView },

  computed: {
    view: {
      get() {
        return this.$route.query.view;
      },

      set(val) {
        val === 'list' ? this.removeQuery('view') : this.addQuery('view', val);
      },
    },

    date: {
      get() {
        return this.$route.query.date;
      },

      set(val) {
        val === 'all' ? this.removeQuery('date') : this.addQuery('date', val);
      },
    },

    participation: {
      get() {
        return this.$route.query.participation;
      },

      set(val) {
        val === 'all' ? this.removeQuery('participation') : this.addQuery('participation', val);
      },
    },

    search: {
      get() {
        return this.$route.query.search;
      },

      set(val) {
        val === '' ? this.removeQuery('search') : this.addQuery('search', val);
      },
    },
  },

  // решить через watch удалось, но пришлось смотреть и за data, и за query роутера. Есть ли лучшее решение через watch?

  // data() {
  //   return {
  //     view: this.myView,
  //     date:  '',
  //     participation: '',
  //     search: '',
  //   }
  // },

  // watch: {
  //   '$route.query.view': {
  //     handler() {
  //       this.view = this.$route.query.view;
  //     },
  //     immediate: true,
  //   },
  //   '$route.query.date': {
  //     handler() {
  //       this.date = this.$route.query.date;
  //     },
  //     immediate: true,
  //   },
  //   '$route.query.participation': {
  //     handler() {
  //       this.participation = this.$route.query.participation;
  //     },
  //     immediate: true,
  //   },
  //   '$route.query.search': {
  //     handler() {
  //       this.search = this.$route.query.search;
  //     },
  //     immediate: true,
  //   },
  //   view() {
  //       this.view === 'list' ? this.removeQuery('view') : this.addQuery('view', this.view);
  //   },
  //   date() {
  //     this.date === 'all' ? this.removeQuery('date') : this.addQuery('date', this.date);
  //   },
  //   participation() {
  //     this.participation === 'all' ? this.removeQuery('participation') : this.addQuery('participation', this.participation);
  //   },
  //   search() {
  //     this.search === '' ? this.removeQuery('search') : this.addQuery('search', this.search);
  //   }
  // },

  methods: {
    removeQuery(key) {
      const newQuery = { ...this.$route.query };
      delete newQuery[key];
      this.$router.push({ query: newQuery }).catch((err) => {
        if (!isNavigationFailure(err, NavigationFailureType.duplicated)) {
          throw err;
        }
      });
    },

    addQuery(key, value) {
      const newQuery = {
        ...this.$route.query,
        [key]: value,
      };
      this.$router.push({ query: newQuery }).catch((err) => {
        if (!isNavigationFailure(err, NavigationFailureType.duplicated)) {
          throw err;
        }
      });
    },
  },
};
</script>
