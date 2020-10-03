<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>  |
      <router-link to="/argu/lele">Argu</router-link>  |
      <router-link to="/info">infro</router-link>
    </div>
    <transition-group name="route">
      <router-view key="default"/>
      <router-view key="tel" name="tel"/>
      <router-view key="email" name="email"/>
    </transition-group>
  </div>
</template>
<script>
export default {
  name: ''
}
</script>

<style lang="less">
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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
