<template>
  <div>
    <slot></slot>
    <Menu v-if="!isCollapsible" theme="dark" @on-select="handleClick">
      <template v-for="item in list">
        <re-sub-menu
          v-if="item.children"
          :key="item.path"
          :parent="item"
        />
        <MenuItem v-else-if="item.name" :key="item.path" :name="item.name">
          <Icon v-if="item.meta && item.meta.icon" :type="item.meta.icon" />
          {{ sideMenuText (item) }}
        </MenuItem>
      </template>
    </Menu>
    <div v-else>
      <template v-for="item in list">
        <re-drop-down
          v-if="item.children"
          :key="item.path"
          :parent="item"
          :isTopLevel="true"
        />

        <div v-else :key="item.path" class="drop_down_icon">
          <Tooltip
            :content="sideMenuText(item)"
            placement="right">
              <Icon
                color="white"
                :type="item.meta.icon"
                :size="20"
                @click="handleClick(item.name)"
              />
          </Tooltip>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import ReDropDown from './re-drop-down'
import ReSubMenu from './re-sub-menu'
export default {
  name: 'SideMenu',
  components: {
    ReDropDown,
    ReSubMenu
  },
  methods: {
    sideMenuText (item) {
      return item.meta && item.meta.title ? item.meta.title : item.name
    },
    handleClick (name) {
      if (this.$route.name === name) return
      this.$router.push({ name })
    }
  },
  props: {
    isCollapsible: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {

    }
  }
}
</script>
<style lang="less" scoped>
.ivu-menu.ivu-menu-vertical{
  width: 100% !important;
}
.drop_down_icon{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0px;
  cursor: pointer;
}
</style>
