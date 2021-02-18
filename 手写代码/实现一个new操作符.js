/**
 * new运算符 :创建一个用户定义的对象类型的实例或具有构造函数的内置对象类型之一
 * 明白new操作符背后实现发生了什么
 * 1. 创建一个空对象
 * 2. 这个对象可以访问构造函数的属性
 * 3. 这个对象可以访问原型上的属性
*/

function simulatNew() {
    var obj = new Object()
    Contstructor = Array.prototype.shift.call(arguments)
    obj.__proto__ = Contstructor.prototype
    Contstructor.apply(obj, arguments)
    return obj
}

function animal() {
    this.name = "dog"
    this.age = 3
}

animal.prototype.sayName = function() {
    console.log("I am ", this.name)
}

var instance = simulatNew(animal)