<template>
  <div class="page page_meetup-forms">
    <div class="container">
      <h1 class="page__title">{{ title }}</h1>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormLayout',
  props: {
    title: String,
  },
};
</script>

<style scoped>
.page.page_meetup-forms {
  padding: 70px 0;
}

@media all and (max-width: 992px) {
  .page.page_meetup-forms {
    padding: 48px 0;
  }
}
</style>
