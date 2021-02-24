/**
 * 题目：实现防抖&节流
 */

// 防抖：不论事件触发多少次，一定在结束触发后n秒触发事件；使用时：div.onclick = debounce(fn, wait)

function debounce(fn, wait) {
    var timeout

    return function() {
        var context = this
        var args = arguments
        clearTimeout(timeout)
        timeout = setTimeout(function(){
            fn.apply(context, args)
        }, wait)
    }
}

function foo() {
    console.log("事件")
}

// 节流：不论事件触发多少次，在触发后n秒，只执行一次；使用时：div.onclick = throttle(fn, wait)
function throttle(fn, wait) {
    var pre = 0, now
    return function() {
        var context = this
        var args = arguments
        now = + new Date()
        if(now - pre > wait) {
            fn.apply(context, args)
            pre = now
        }
    }
}