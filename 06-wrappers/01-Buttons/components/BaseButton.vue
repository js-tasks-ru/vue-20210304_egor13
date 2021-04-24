<template>
  <component :is="tag" v-bind="$attrs" v-on="$listeners" :type="type" class="button" :class="{'button_block': block}">
    <slot />
  </component>
  <!-- <button type="button" class="button"></button> -->
</template>

<script>
export default {
  name: 'BaseButton',
  inheritAttrs: false,
  props: {
    block: Boolean,
    tag: {
      type: [String, Object],
      default: 'button',
    },
  },
  computed: {
    type() {
      return this.componentTag === 'button' ? 'button' : null;
    },
  },
};
</script>

<style scoped>
.button {
  display: inline-block;
  padding: 10px 24px;
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
  color: initial;
  text-align: center;
  border: 4px solid transparent;
  transition: 0.2s all;
  outline: none;
  box-shadow: none;
  background-color: transparent;
  cursor: pointer;
  text-decoration: none;
}

.button.button_block {
  display: block;
  width: 100%;
}
</style>
