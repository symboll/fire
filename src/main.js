import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ViewUI from 'view-design'

// import 'view-design/dist/styles/iview.css'
import './theme/index.less'

Vue.use(ViewUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
  // render: h => {
  //   return h('div', {
  //     // 'class': 'count-to count-from',
  //     // 'class': ['count-to', count === 1 ? 'count-from' : ''],
  //     // 'class': {
  //     //   'count-to': true
  //     // },
  //     attrs: {
  //       id: 'test-id'
  //     },
  //     domProps: {

  //     },
  //     props: {

  //     },
  //     style: {
  //       color: 'red'
  //     },
  //     on: {
  //       'click': () => console.log('have click!')
  //     },
  //     // nativeOn: {
  //     // },
  //     directives: [],
  //     scopedSlots: {

  //     }
  //     // slot: '',
  //     // key: ''
  //     // ref: ''
  //   }, 'test')
  // }
}).$mount('#app')
