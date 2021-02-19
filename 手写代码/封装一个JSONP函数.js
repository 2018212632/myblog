/**
 * 要求：在开发中可能遇到多个JSONP请求的回调函数名相同，这是就需要封装一个JSONP函数
*/
// 客户端
function jsonp({url, params, callback}) {
    return new Promise((resolve, reject) => {
        let script = document.createElement('script')
        window[callback] = function(data) {
            resolve(data)
            document.body.removeChild(script)
        }
        params = {...params, callback}
        let arrs = []
        for(let key in params) {
            arrs.push(`${key}=${params[key]}`)
        }
        script.src = `${url}?${arrs.join('&')}`
        document.body.appendChild(script)
    })
}

jsonp({
    url: 'http://localhost:3000',
    params: {age: 20},
    callback: 'show'
}).then((data) => {
    console.log(data)
})

// 实现效果：发起这个请求 http://localhost:300?age=20&callback=show 

// 服务端：
let express = require("express")
let app = express()
app.get('/', function(req, res) {
    let {age, callback} = req.query
    res.send(`${callback}('要发送的数据')`)
})
app.listen(3000)