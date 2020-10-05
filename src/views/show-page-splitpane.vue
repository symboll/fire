<template>
  <div class="split-pane">
    <split-pane :initOffset.sync="initOffset"></split-pane>
  </div>
</template>
<script>
import SplitPane from '../components/split-pane'
export default {
  components: {
    SplitPane
  },
  data () {
    return {
      initOffset: 0.3
    }
  }

}
</script>
<style lang="less">
.split-pane{
  width: 400px;
  height: 200px;
  background: papayawhip;
}
</style>
