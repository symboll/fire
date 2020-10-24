<template>
  <div>
    <!-- <ul @click="handleClick">
      <li
        @click.stop="handleClick"
        v-for="item in list"
        :key="item.id">
        {{ item.name }}
      </li>
    </ul> -->
    <list :list="list" :render="renderFunction"></list>
  </div>
</template>
<script>
import List from '@/components/render-func'
export default {
  name: 'render-page',
  components: {
    List
  },
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
    },
    renderFunction (h, name) {
      // return h('i', {
      //   style: {
      //     color: 'red'
      //   }
      // }, name)
      return <i on-click={this.handleClick} style={{ color: 'red' }}>{ name }</i>
      // 组件绑定事件 nativeOn-  / on-
    }
  }
}
</script>
<style lang="less" scoped>

</style>
