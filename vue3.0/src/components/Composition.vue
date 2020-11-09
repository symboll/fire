<template>
  <div>
    <input type="number" v-model="state.num1" @keyup="add" />
    +
    <input type="number" v-model="state.num2" @keyup="add" />
    =
    {{ state.result }}
  </div>
</template>

<script lang="ts">
import { reactive } from 'vue'
// import { Options, Vue } from 'vue-class-component'
// @Options({
//   props: {
//     msg: String
//   }
// })
// export default class HelloWorld extends Vue {
//   msg!: string
// }
export default {
  name: 'CompositionApi',
  setup () {
    const state = reactive({
      num1: 0,
      num2: 0,
      result: 0
    })
    function add () {
      state.result = Number(state.num1) + Number(state.num2)
    }
    return {
      state,
      add
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"></style>
