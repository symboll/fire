<template>
  <li class="menu-item">
    <slot></slot>
  </li>
</template>
<script>
export default {
  name: 'AMenuItem'
}
</script>
<style lang="less">
li {
  list-style: none;
}
.menu-item {
  padding: 14px 24px;
  cursor: pointer;
}
</style>
