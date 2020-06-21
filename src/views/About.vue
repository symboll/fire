<template>
  <div class="about">
    <h1>This is an about page</h1>

    <h1>key: {{ key }}</h1>
    <!-- <h1>moduleKey:{{ moduleKey }}</h1> -->
    <h1>moduleKey:{{ modulesKeyGetter }}</h1>

    <Button @click="handleClick"> change Store key</Button>
    <Button @click="handleActionChange" type="primary">action change store key</Button>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: '',
  computed: {
    // key () {
    //   return this.$store.state.key
    // },
    // moduleKey () {
    //   return this.$store.state.user.moduleKey
    // }

    // ...mapState({
    //   key: state => state.key,
    //   moduleKey: state => state.user.moduleKey
    // })
    ...mapState([
      'key',
      'inputValue'
    ]),
    ...mapGetters([
      'modulesKeyGetter'
    ])
  },
  methods: {
    ...mapMutations([
      'SET_APP_KEY',
      'SET_INPUT_VALUE'
    ]),
    ...mapActions([
      'updateAppKey'
    ]),
    handleClick () {
      this.$store.commit(
        'SET_APP_KEY',
        { key: 'zhangsi' }
      )
      // this.SET_APP_KEY({
      //   key: 'zhangsan'
      // })
    },
    handleActionChange () {
      // this.updateAppKey()
      this.$store.dispatch('updateAppKey')
    }
  }
}
</script>
<style lang="less">

</style>
