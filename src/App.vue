<template>
  <div class="app">
    <!-- <div class="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>  |
      <router-link to="/argu/lele">Argu</router-link>  |
      <router-link to="/info">infro</router-link>
    </div> -->
    <!-- <transition-group name="route">
      <router-view key="default"/>
      <router-view key="tel" name="tel"/>
      <router-view key="email" name="email"/>
    </transition-group> -->
      <router-view />
  </div>
</template>
<script>
export default {
  name: 'app'
}
</script>

<style lang="less" scoped>
.route-enter{
  opacity: 0;
}
.route-enter-active{
  transition: opacity .5s ease;
}
.route-enter-to {
  opacity: 1;
}
.route-leave {
  opacity: 1;
}
.route-leave-active {
  transition: opacity .5s ease;
}
.route-leave-to {
  opacity: 0;
}
</style>
