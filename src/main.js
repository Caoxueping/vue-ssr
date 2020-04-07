import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import { createStore } from './store'

Vue.config.productionTip = false

/** 
 * 服务端渲染只有beforeCreate，created两个钩子 
 * axios放在store内
 * */
// 加入混入：只在客户端执行， 判断当前组件的asyncData是否存在
Vue.mixin({
  beforeMount() {
    if (this.$options.asyncData) {
      this.$options.asyncData({
        store: this.$store,
        route: this.$route
      })
    }
  }
})

export function createApp(context) {
  // 创建路由
  const router = createRouter()
  
  // 创建路由
  const store = createStore()

  // 创建Vue实例
  const app = new Vue({
    router,
    context,
    store,
    render: h => h(App),
  })

  return { router, app, store }
}
