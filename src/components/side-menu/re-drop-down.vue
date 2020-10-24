<template>
  <div class="drop_down">
    <Dropdown placement="right-start">
      <div class="drop_down_icon">
        <Icon :type="parent.meta.icon" color="white" :size="20" />
      </div>
      <DropdownMenu slot="list" >
        <DropdownItem disabled>
          {{ sideMenuText(parent) }}
          <Icon type="ios-arrow-down"></Icon>
        </DropdownItem>

        <DropdownItem
          v-for="item in parent.children"
          :key="item.path"
          @click.native="handleClick(item.name)"
        >
          <re-drop-down
            v-if="item.children"
            :parent="item"
          />
          <span v-else>{{ sideMenuText(item) }}</span>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
export default {
  name: 're-drop-down',
  props: {
    parent: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    sideMenuText (item) {
      return item.meta && item.meta.title ? item.meta.title : item.name
    },
    handleClick (name) {
      if (this.$route === name) return
      this.$router.push({ name })
    }
  }
}
</script>
<style lang="less" scoped>
.drop_down{
  width: 100%;
  .ivu-dropdown{
    width: 100%;
  }
  &_icon {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0px;
  }
}
.drop_down /deep/.ivu-select-dropdown{
    width: 100px;
}

</style>
