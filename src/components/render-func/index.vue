<template>
  <ul>
    <li v-for="item in list" :key="item.id">
      <!-- <span v-if="!render">{{ item.name }} </span>
      <render-func v-else :render="render" :name="item.name"></render-func> -->
      <render-func :render="render" :name="item.name"></render-func>
    </li>
  </ul>
</template>
<script>
import renderFunc from './render-func'
export default {
  name: 'list',
  components: {
    renderFunc
  },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    render: {
      type: Function,
      default: () => {}
    }
  }
}
</script>
