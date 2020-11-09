<template>
  <div>

  </div>
</template>
<script>
import consoleMixin from '../mixin/console'
export default {
  name: '',
  data () {
    return {

    }
  },
  methods: {
    init () { console.log('component init') }
  },
  created () {
    console.log('1122')
  },
  mixins: [consoleMixin]
}
</script>
<style lang="scss">

</style>
