<template>
  <ul>
    <li v-for="item in list" :key="item.id">
      <slot :number="item.number"></slot>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'list',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  }
}
</script>
