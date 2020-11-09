<template>
  <div>
    <Layout class="layout">
      <Sider collapsible v-model="isCollapsible" hide-trigger>
        <side-menu :isCollapsible="isCollapsible" :list="routes">
          <div class="logo_area">
            Logo
          </div>
        </side-menu>
      </Sider>
      <Layout>
        <Header class="layout_header">
          <Icon
            @click.native="handleTrigger"
            type="md-menu"
            :size="32"
            :class="triggerClasss"
          />
          <div class="user_info">
            <Dropdown>
              <Avatar :src="avatar" />
              <span class="user_name"> {{ username }} </span>
              <DropdownMenu slot="list">
                <DropdownItem @click.native="handleLogout">
                  <Icon type="md-power" />
                  退出系统</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </Header>
        <Content class="layout_content">
          <Card shadow class="page_card">
            <router-view />
          </Card>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import SideMenu from '@/components/side-menu'
export default {
  name: 'layout',
  components: {
    SideMenu
  },
  props: {},
  data () {
    return {
      isCollapsible: false
    }
  },
  computed: {
    ...mapState({
      username: state => state.user.username,
      avatar: state => state.user.avatar
    }),
    triggerClasss () {
      return ['trigger_icon', this.isCollapsible ? 'rotate' : '']
    },
    routes () {
      return this.$router.options.routes[0].children
    }
  },
  methods: {
    ...mapMutations([
      'LOGOUT'
    ]),
    handleTrigger () {
      this.isCollapsible = !this.isCollapsible
    },
    handleLogout () {
      this.LOGOUT()
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
<style lang="less" scoped>
.user_info /deep/.ivu-dropdown-rel {
  height: 50px;
}

.layout {
  height: 100vh;
  &_header {
    background: #fff;
    box-shadow: 0px 1px 10px 1px rgba(0, 0, 0, 0.1);
    padding: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .trigger_icon {
      cursor: pointer;
      transition: transform 0.3s ease;
      &.rotate {
        transform: rotateZ(90deg);
        transition: transform 0.3s ease;
      }
    }
    .user_info {
      margin-right: 30px;
      .user_name {
        margin-left: 6px;
      }
    }
  }
  &_content {
    margin: 2px;
    padding: 10px;
    .page_card {
      height: 100%;
    }
  }
}

.logo_area {
  background: #fff;
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid #efefef;
}
</style>
