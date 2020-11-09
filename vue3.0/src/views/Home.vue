<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Composition  />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Composition from '@/components/Composition.vue' // @ is an alias to /src

@Options({
  components: {
    Composition
  }
})
export default class Home extends Vue {}
</script>
