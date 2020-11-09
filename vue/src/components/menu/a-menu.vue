<template>
  <ul class="a-menu" :style="{ width: `${width}px` }">
    <slot></slot>
  </ul>
</template>
<script>
export default {
  name: 'AMenu',
  props: {
    width: {
      type: Number,
      default: 200
    }
  }
}
</script>
<style lang="less">
.a-menu {
  border: 1px solid #eee;
}
</style>
