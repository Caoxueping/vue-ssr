// 客户端激活

import { createApp } from './main'

// 创建vue实例
const { router, app, store } = createApp()

// 恢复store的数据状态
if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__) // replaceState： 将store.state的数据替换成window.__INITIAL_STATE__
}

// 路由就绪事件 执行挂载
router.onReady(() => {
    app.$mount("#app")
})