<template>
  <div class="toasts">
    <template v-if="messages.length !== 0">
      <toaster-message v-for="messageItem in messages" :key="messageItem.id" :messageItem="messageItem" />
    </template>
    <!-- <div v-for="{ id, classMod, message, icon } in messages" :key="id" class="toast toast_success" :class="classMod">
      <app-icon :icon="icon" />
      <span>{{ message }}</span>
    </div> -->
  </div>
</template>

<script>
import ToasterMessage from './ToasterMessage';

import { nanoid } from 'nanoid';

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
      const id = nanoid();
      this.messages.push({
        id,
        title: message,
        classMod: 'toast_error',
        icon: 'alert-circle',
      });

      this.setRemoveDelay(id);
    },

    success(message) {
      const id = nanoid();
      this.messages.push({
        id,
        title: message,
        classMod: 'toast_success',
        icon: 'check-circle',
      });

      this.setRemoveDelay(id);
    },

    setRemoveDelay(id) {
      setTimeout(() => {
        this.messages = this.messages.filter((msg) => msg.id !== id);
      }, this.$options.DELAY);
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
