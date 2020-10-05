<template>
  <div>
    <list :list="list" >
      <count-to slot-scope="count" :endVal="count.number"></count-to>
    </list>
  </div>
</template>
<script>
import List from '@/components/slot'
import CountTo from '@/components/count-to'
export default {
  name: 'slot-scope-page',
  components: {
    List,
    CountTo
  },
  data () {
    return {
      list: [
        { id: 1, number: 200 },
        { id: 2, number: 340 }
      ]
    }
  },
  methods: {

  }
}
</script>
