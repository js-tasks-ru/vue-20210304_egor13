<template>
  <div class="toasts">
    <toaster-message v-for="(messageItem, i) in messages" :key="i" :messageItem="messageItem" />
  </div>
</template>

<script>
import ToasterMessage from './ToasterMessage';

export default {
  name: 'TheToaster',

  components: { ToasterMessage },

  data() {
    return {
      messages: [],
    };
  },

  DELAY: 5000,

  methods: {
    error(message) {
      this.messages.push({
        title: message,
        type: 'error',
        // classMod: 'toast_error',
        // icon: 'alert-circle',
      });

      this.setRemoveDelay();
    },

    success(message) {
      this.messages.push({
        title: message,
        type: 'success',
        // classMod: 'toast_success',
        // icon: 'check-circle',
      });

      this.setRemoveDelay();
    },

    setRemoveDelay() {
      setTimeout(() => this.messages.shift(), this.$options.DELAY);
    },
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}
</style>
