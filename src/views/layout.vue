<template>
  <div>
    <Layout class="layout">
        <Sider
          collapsible
          v-model="isCollapsible"
          hide-trigger
        >
          <side-menu
            :isCollapsible="isCollapsible"
            :list="routes"
          >
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
import SideMenu from '@/components/side-menu'
export default {
  name: 'layout',
  components: {
    SideMenu
  },
  props: {

  },
  data () {
    return {
      isCollapsible: false
    }
  },
  computed: {
    triggerClasss () {
      return [
        'trigger_icon',
        this.isCollapsible ? 'rotate' : ''
      ]
    },
    routes () {
      return this.$router.options.routes[0].children
    }
  },
  methods: {
    handleTrigger () {
      this.isCollapsible = !this.isCollapsible
    }
  }
}
</script>
<style lang="less" scoped>
.layout{
  height: 100vh;
  &_header{
    background: #fff;
    box-shadow: 0px 1px 10px 1px rgba(0, 0, 0, .1);
    padding: 16px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .trigger_icon{
      cursor: pointer;
      transition: transform .3s ease;
      &.rotate {
        transform: rotateZ(90deg);
        transition: transform .3s ease;
      }
    }
  }
  &_content{
    margin: 2px;
    padding: 10px;
    .page_card{
      height: 100%;
    }
  }
}

.logo_area{
  background: #fff;
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid #efefef;
}
</style>
