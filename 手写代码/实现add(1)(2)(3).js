/**
 * 题目：实现一函数，让add(1)(2)(3)等效于add(1,2,3)
 * 本质上实现对函数的柯里化，每次调用函数时，只传入一部分参数，如果传入参数大于等于原函数实际参数就执行原函数，否则就返回函数；
 * 柯里化能够让参数更好的复用
 */

function add1(x, y, z) {
    return x+y+z
}

const curry = (fn, ...args) => {
    // 当传入参数大于等原函数实际参数，就执行
    // 否则继续对当前函数进行柯里化
    if(args.length >= fn.length) {
        return fn(...args)
    } else{
        return (fn, ..._args) => curry(fn, ...args, ..._args) 
    }
} 

const add = curry(add1)
console.log(add(1, 2, 3));
console.log(add(1)(2)(3));
console.log(add(1, 2)(3));

// 如果要实现add(1)(2)(n)无限次数的话，怎么办
function add() {
    let args = Array.prototype.slice.call(arguments)
    //该函数的作用是接受第二次传入的参数
    let inner = function () {
        args.push(...arguments)
        return inner //递归调用
    }

    //利用隐式转换改写
    inner.toString = function () {
        return args.reduce((pre, cur) => { 
            return pre + cur
        },0)
    }
    return inner 
}

console.log(add(1)(2)(3))

