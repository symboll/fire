<template>
  <div>
    default:xxx
    <Button @click="getUserList" type="primary">获取用户列表</Button>
    <div v-for="item in userlist" :key="item.id">{{ item.username }}</div>
  </div>
</template>
<script>
import { Test } from '@/api/test'
export default {
  data () {
    return {
      userlist: []
    }
  },
  methods: {
    getUserList () {
      Test().then(res => {
        this.userlist = res.data.data || []
      }).catch(err => {
        console.log('err=>', err)
      })
    }
  }
}
</script>
<style lang="less">

</style>
