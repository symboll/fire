<template>
  <div>
    <Submenu :name="parent.name">
       <template slot="title">
          <Icon v-if="parent.meta && parent.meta.icon" :type="parent.meta.icon" />
          {{ sideMenuText(parent) }}
      </template>

      <template v-for="item in parent.children">
        <re-sub-menu
          v-if="item.children"
          :key="item.path"
          :parent="item"
        />
        <MenuItem v-else :key="item.path" :name="item.name">
          {{ sideMenuText(item) }}
        </MenuItem>
      </template>
    </Submenu>
  </div>
</template>

<script>
export default {
  name: 're-sub-menu',
  props: {
    parent: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    sideMenuText (item) {
      return item.meta && item.meta.title ? item.meta.title : item.name
    }
  }
}

</script>
<style lang="less" scoped>
</style>
