<template>
  <div>
    <!-- <div>{{ $route.params.name }}</div> -->
    <p>{{ name }}</p>
  </div>
</template>
<script>
// $route 当前路由对象
export default {
  name: '',
  props: {
    name: {
      type: [String, Number]
      // default: 'Symbol'
    }
  },
  mounted () {
    console.log(this.$route)
  }
}
</script>
<style lang="less" scoped>

</style>
