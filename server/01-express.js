// 传统web， 网页内容在服务端渲染完成，一次性传输到浏览器
// 属于服务端渲染，这里使用express演示传统页面渲染
const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('hello world !')
})

app.listen('3000')