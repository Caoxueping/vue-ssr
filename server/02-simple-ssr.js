// 传统web， 网页内容在服务端渲染完成，一次性传输到浏览器
// 属于服务端渲染，这里使用express演示传统页面渲染
const express = require('express')
const app = express()

// 导入Vue vue-Router
const Vue = require('vue')
const Router = require('vue-router')
Vue.use(Router)

// 渲染器导入
const { createRenderer } = require('vue-server-renderer')

// 创建一个渲染器
const renderer = createRenderer()

// 问题1.不能交互
// 问题2.不能同构开发
// 问题3.路由处理问题
app.get('*', async(req, res) => {
    const router = new Router({
        model: 'history',
        routes:[{
            path: '/',
            component: {template: "<div>index page</div>"}
        },{
            path: '/detail',
            component: {template: "<div>detail page</div>"}
        }]
    })
    // 创建一个Vue实例
    const vm = new Vue({
        data: {name: 'vue ssr !!'},
        router,
        template: "<div><router-view></router-view></div>"
    })
    try {
        // 跳转到url对应路由页面
        // 首屏渲染
        router.push(req.url)
        const html = await renderer.renderToString(vm)
        // 将渲染的html字符串返回给客户端
        res.send(html)
    } catch (error) {
        // 将错误信息返回给用户
        console.log("服务器渲染错误， 请重试!!");
    }
    
})

app.listen('3000')