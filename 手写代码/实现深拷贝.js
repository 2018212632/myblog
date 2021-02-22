/**
 * 题目：实现深拷贝
 * 原理：在赋值的过程中，如果是基本类型，会直接创建新的对象；如果是引用类型的对象，那么拷贝的是对象的引用
 */

function deepCopy(obj) {
    if(typeof obj !== "object") return 
    var newObj = obj instanceof Array ? [] : {}
    for(var key in obj) {
        if(obj.hasOwnProperty(key)) {
            newObj[key] = typeof obj[key] === "object" ? deepCopy(obj[key]) : obj[key]
        }
    }
    return newObj
}
