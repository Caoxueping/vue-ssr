// 传统web， 网页内容在服务端渲染完成，一次性传输到浏览器
// 属于服务端渲染，这里使用express演示传统页面渲染
const express = require('express')
const app = express()

// 获取绝对路径函数
const resolve = dir => require('path').resolve(__dirname, dir)

// 1.静态目录开放 dist/client   false:关闭默认下载index⻚的选项，不然到不了后⾯路由
app.use(express.static(resolve('../dist/client'), {index: false}))

// 2. 获取bundleRenderer
const { createBundleRenderer } = require('vue-server-renderer')

// 创建一个渲染器
const bundle = resolve('../dist/server/vue-ssr-server-bundle.json') /** 服务端打包⽂件地址 */
const renderer = createBundleRenderer(bundle, {
    runInNewContext: false,
    template: require('fs').readFileSync(resolve('../public/index.html'), 'utf-8'), /** 宿主文件 */
    clientManifest: require(resolve('../dist/client/vue-ssr-client-manifest.json')), /** 客户端清单 */
})

// 问题1.不能交互
// 问题2.不能同构开发
// 问题3.路由处理问题
app.get('*', async (req, res) => {
    try {
        const html = await renderer.renderToString({
            url: req.url,
            title: 'vue ssr'
        })
        // 将渲染的html字符串返回给客户端
        res.send(html)
    } catch (error) {
        // 将错误信息返回给用户
        console.log("服务器渲染错误， 请重试!!");
    }
    
})

app.listen('3000')