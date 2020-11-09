<template>
  <div>
    <a-menu :width="240" >
      <template v-for="item in list">
        <re-sub-menu
          v-if="item.children"
          :key="item.id"
          :child="item"
        >
        </re-sub-menu>
        <a-menu-item v-else :key="item.id">{{ item.title }}</a-menu-item>
      </template>
    </a-menu>
  </div>
</template>
<script>
import { AMenu, AMenuItem } from '@/components/menu'
import ReSubMenu from '@/components/menu/re-sub-menu'
export default {
  name: 'recursive-page',
  components: {
    AMenu,
    AMenuItem,
    ReSubMenu
  },
  data () {
    return {
      list: [
        {
          id: 0,
          title: '123'
        },
        {
          id: 1,
          title: '124'
        },
        {
          id: 2,
          title: '125',
          icon: 'ios-analytics',
          children: [
            {
              id: 21,
              title: '1256'
            },
            {
              id: 22,
              title: '1257',
              children: [
                {
                  id: 221,
                  title: '12571'
                }
              ]
            }
          ]
        }
      ]
    }
  }
}
</script>
