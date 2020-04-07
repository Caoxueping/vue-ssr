// 服务端入口：
// 1.导航至首屏
// 2.

import { createApp } from './main.js'

// 返回⼀个函数，接收请求上下⽂，返回创建的vue实例
export default context => {
        // 我们返回一个 Promise
        // 确保路由或组件准备就绪
    return new Promise((resolve, reject) => {
        const { app, router, store } = createApp(context)

        // 导航至首屏
        router.push(context.url)

        // 导航过程可能是异步的
        router.onReady(() => {
            // 请求后可能有异步数据获取
            // 1.获取匹配的路由组件数组
            const matchComponents = router.getMatchedComponents()

            // 可能没有匹配的组件
            if(!matchComponents.length) return reject({code: 404})

            // 遍历 ，看有无matchComponents
            Promise.all(matchComponents.map(component => { // component: 组件配置对象
                if (component.asyncData) {
                    return component.asyncData({
                        store,
                        route: router.currentRoute
                    })
                }
            })).then(() =>{
                 /**获取所有的数据结果后，将这些数据结果存入store
                 * 将这些状态指定给上下文，将来bundleRenderer在渲染的时候
                 * 会将这些值附加在 window.__INITIAL_STATE__
                 */
                context.state = store.state

                resolve(app)
            })
        }, reject)
        // 导航的过程可能是异步的
    })
    

}