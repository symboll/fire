<template>
  <div class="home">
    <div>appUserName: {{username}}</div>
    <div>this.is home page</div>
    <Button type="primary" @click="handleClick('back')">back</Button>
    <Button type="warning" @click="handleClick('push')">push</Button>
    <Button type="error" @click="handleClick('replace')">replace</Button>
    <div class="logout-btn">
      <Button type="primary" @click="handleLogout">退出登录</Button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'home',
  components: {

  },
  computed: {
    ...mapState({
      username: state => state.user.username
    })
  },
  // 组件内守卫
  // beforeRouteEnter (to, from, next) {

  // },
  // beforeRouteLeave (to, from, next) {

  // },
  // beforeRouteUpdate (to, from, next) {

  // },
  methods: {
    ...mapMutations([
      'LOGOUT'
    ]),
    handleLogout () {
      this.LOGOUT()
      this.$router.push({ name: 'login' })
    },
    handleClick (type) {
      switch (type) {
        case 'back':
          this.$router.go(-1)
          // this.$router.back()
          break
        case 'push':
          // this.$router.push('./info')
          // this.$router.push({ name: 'about', query: { name: 'zhangsan' } })
          this.$router.push({
            name: 'argu',
            params: {
              name: 'zhangsan'
            }
          })
          break
        case 'replace':
          this.$router.replace({ name: 'about' })
          break
        default:console.log('type')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.logout-btn{
  padding: 10px;
}
</style>
