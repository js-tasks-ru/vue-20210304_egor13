<template>
  <div class="toast" :class="view.class">
    <app-icon :icon="view.icon" />
    <span>{{ messageItem.title }}</span>
  </div>
</template>

<script>
import AppIcon from './AppIcon';

export default {
  name: 'ToasterMessage',
  components: { AppIcon },
  props: {
    messageItem: Object,
  },

  computed: {
    view() {
      return this.messageItem.type === 'success'
        ? {
            class: 'toast_success',
            icon: 'check-circle',
          }
        : {
            class: 'toast_error',
            icon: 'alert-circle',
          };
    },
  },
};
</script>

<style scoped>
.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast > .icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
</style>
