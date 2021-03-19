/**
 * 题目：实现一个异步队列：让异步函数可以顺序执行
 * 实现方式：
 *  1. promise链式调用，处理一个个的回调函数，需要手写，不能用队列
 *  2. 将promise链式调用进行封装，实现一个queue函数，参数传入异步队列
 *  3. 使用 async/await 改造这个函数
 */

// 异步函数a
var a = function () {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve('a')
    }, 1000)
  })
}

// 异步函数b
var b = function (data) {
  return new Promise(function (resolve, reject) {
    resolve(data + 'b')
  })
}

// 异步函数c
var c = function (data) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(data + 'c')
    }, 500)
  })
}

function queue(arr) {
  var sequence = Promise.resolve()
  arr.forEach(function (item) {
    sequence = sequence.then(item)
  })
  return sequence
}

// async / await 写法
// async function queue(arr) {
//     let res = null
//     for(let item of arr) {
//         res = await item(res)
//     }
//     return await res
// }

queue([a, b, c])
  .then((data) => {
    console.log(data)
  })