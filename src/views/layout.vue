<template>
  <div>
    <Layout class="layout">
        <Sider
          collapsible
          v-model="isCollapsible"
          hide-trigger
        >
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
export default {
  name: 'layout',
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
</style>
