<template>
  <div>
    <count-to ref="count-to"
      :end-val="value"
      className="font-color-red"
      @animation-end="animationEnd"
    >
      <span slot="prefix">{{ prefix }}</span>
      <span slot="suffix">{{ suffix }}</span>
    </count-to>
    <Button type="primary" @click="getNumber">按钮</Button>
    <Button type="warning" @click="updateNumber">更新值</Button>
  </div>
</template>
<script>
import CountTo from '@/components/count-to'
export default {
  components: {
    CountTo
  },
  data () {
    return {
      value: 2000,
      prefix: '金额:',
      suffix: '元'
    }
  },
  methods: {
    getNumber () {
      console.log('==>', this.$refs['count-to'].getCountUpNumber())
    },
    updateNumber () {
      // const random = Math.floor(Math.random() * 20000) / 100
      // this.value += random
      this.value += Math.random() * 200
      this.value = Math.floor(this.value * 100) / 100
    },
    animationEnd (value) {
      console.log('end==>', value)
    }
  }
}
</script>
<style lang="less">
.font-color-red{
  color: red;
}
</style>
