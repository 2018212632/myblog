/**
 * 题目：实现数组拍平，即将多层嵌套的数组变成一层的数组
 */

let arr = [1, [2, [3, 4]]] // 经过拍平之后，arr :[1, 2, 3, 4]

// 方案一：递归,遍历数组，判断每个元素是不是数组，如果是，那么递归调用函数，否则添加到新数组中

function falt(arrs) {
    let res = []
    const help = (arr) => {
        for(let item of arr) {
            if(item instanceof Array) {
                help(item)
            } else {
                res.push(item)
            }
        }
    }
    help(arrs)
    return res
}

arr = falt(arr)

// 方案二：借助reduce函数，简化代码
function falt2(arrs) {
    return arrs.reduce((prev, next) => {
        return prev.concat(Array.isArray(next) ? falt2(next) : next)
    }, [])
}