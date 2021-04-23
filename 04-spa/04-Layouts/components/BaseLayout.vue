<template>
 <div class="wrapper bg-grey">
   <the-header />
    <main class="main">
      <div class="page page_onboarding">
        <slot />
      </div>
    </main>
    <the-footer />
 </div>
</template>

<script>
import TheHeader from './TheHeader.vue';
import TheFooter from './TheFooter.vue';

export default {
  name: 'BaseLayout',
  components: {
    TheHeader,
    TheFooter,
  }
};
</script>

<style scoped>
main {
  flex: 1 0 auto;
}
</style>
