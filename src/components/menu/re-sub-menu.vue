<template>
  <a-sub-menu>
    <Icon slot="icon" v-if="child.icon" :type="child.icon" />
    <span slot="title">{{ child.title }}</span>
    <template v-for="item in child.children">
      <re-sub-menu :key="item.id" v-if="item.children" :child="item"></re-sub-menu>
      <a-menu-item :key="item.id" v-else>
        {{ item.title }}
      </a-menu-item>
    </template>
  </a-sub-menu>
</template>
<script>
import { ASubMenu, AMenuItem } from './index'
export default {
  name: 're-sub-menu',
  props: {
    child: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    ASubMenu,
    AMenuItem
  }
}
</script>
