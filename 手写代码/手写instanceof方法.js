/**
 * 题目：手写一个instanceof方法
 * 原理：判断A.__proto__是否和B.prototype相等，需要一直查找A的原型链
 */
function myinstanceof(A, B){
    while(true) {
        if(A.__proto__ === null) {
            return false
        } 
        if(A.__proto__ === B.prototype) {
            return true
        }
        A.__proto__ = A.__proto__.__proto__
    }
}