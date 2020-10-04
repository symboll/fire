<template>
  <div>
    <slot name="prefix"></slot>
    <span :id="elementId" :class="countToClass" ref="count-up"></span>
    <slot name="suffix"></slot>
  </div>
</template>
<script>

import { CountUp } from 'countup.js'
export default {
  name: 'count-up',
  props: {
    /**
     * @description 起始值
    */
    startVal: {
      type: Number,
      default: 0
    },
    /**
     * @description 结束值
    */
    endVal: {
      type: Number,
      required: true
    },
    /**
     * @description 小数位置
    */
    decimalPlaces: {
      type: Number,
      default: 2
    },
    /**
     * @description 动画持续时长
    */
    duration: {
      type: Number,
      default: 1.2
    },
    /**
     * @description 是否使用分组
    */
    useGrouping: {
      type: Boolean,
      default: true
    },
    /**
     * @description 动画 ease
    */
    useEasing: {
      type: Boolean,
      default: true
    },
    smartEasingThreshold: {
      type: Number,
      default: 999
    },
    smartEasingAmount: {
      type: Number,
      default: 333
    },
    /**
     * @description 分组分隔符
    */
    separator: {
      type: String,
      default: ','
    },
    /**
     * @description 小数分隔符
    */
    decimal: {
      type: String,
      default: '.'
    },
    easingFn: {
      type: Function
    },
    formattingFn: {
      type: Function
    },
    /**
     * @description 前缀
    */
    prefix: {
      type: String,
      default: ''
    },
    /**
     * @description 后缀
    */
    suffix: {
      type: String,
      default: ''
    },
    /**
     * @description 数字替代
    */
    numerals: {
      type: Array,
      default: () => Array.from({ length: 10 }, (_, i) => i)
    },
    /**
     * @description 类名
    */
    className: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      countUp: null
    }
  },
  computed: {
    elementId () {
      return `count_up_${this._uid}`
    },
    countToClass () {
      return ['count-up', this.className]
    }
  },
  watch: {
    endVal (newValue, oldValue) {
      this.countUp.update(newValue)
      setTimeout(() => {
        this.$emit('animation-end', newValue)
      }, this.duration * 1000)
    }
  },
  methods: {
    getCountUpNumber () {
      return this.$refs['count-up'].innerText
    }
  },
  mounted () {
    this.countUp = new CountUp(
      this.elementId,
      this.endVal,
      {
        startVal: this.startVal,
        decimalPlaces: this.decimalPlaces,
        duration: this.duration,
        useGrouping: this.useGrouping,
        useEasing: this.useEasing,
        smartEasingThreshold: this.smartEasingThreshold,
        smartEasingAmount: this.smartEasingAmount,
        separator: this.separator,
        decimal: this.decimal,
        easingFn: this.easingFn,
        formattingFn: this.formattingFn,
        prefix: this.prefix,
        suffix: this.suffix,
        numerals: this.numerals
      }
    )
    this.countUp.start()
  }
}
</script>
<style lang="less">

</style>
