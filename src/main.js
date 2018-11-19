import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import './register'

// 引入css中的静态样式
import './common/stylus/index.styl'
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
