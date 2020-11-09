<template>
  <li class="sub-menu">
    <div class="sub-menu-title-wrap" @click="handleTrigger">
      <slot name="icon"></slot>
      <slot name="title"></slot>
      <Icon :type=" isOpen ? 'ios-arrow-up': 'ios-arrow-down'"  />
    </div>
    <transition name='sub-menu'>
      <ul v-if="isOpen" class="sub-menu-open-con"><slot></slot></ul>
    </transition>
  </li>
</template>
<script>
export default {
  name: 'ASubMenu',
  data () {
    return {
      isOpen: false
    }
  },
  methods: {
    handleTrigger () {
      this.isOpen = !this.isOpen
    }
  }
}
</script>
<style lang="less">
.sub-menu-enter-active,
.sub-menu-leave-active{
  transition: all .3s ease;
}

.sub-menu {
  width: 100%;
  &-title-wrap {
    padding: 14px 24px;
    cursor: pointer;
    display: flex;
    align-items: center;
    >i:first-child {
      margin-right: 8px;
    }
    >i:last-child {
      margin-left: 8px;
    }
    >span {
      flex: 1;
      display: inline-block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  &-open-con{
    padding-left: 20px;
  }
}
</style>
