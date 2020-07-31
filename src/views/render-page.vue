<template>
  <div>
    <ul @click="handleClick">
      <li
        @click.stop="handleClick"
        v-for="item in list"
        :key="item.id">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'render-page',
  data () {
    return {
      list: [
        { name: '张三', id: 1 },
        { name: '李四', id: 2 }
      ]
    }
  },
  methods: {
    handleClick (e) {
      console.log(e)
    }
  }
}
</script>
<style lang="less" scoped>

</style>
