/**
 * 题目：实现一个简单的js函数，对传入数据的监听，当数据更改的时候，可以监听到对应的改动
 * 1. ES5：在ES5中，通过defineProperty()进行监听
 */
// Object.defineProperty：直接在一个对象上定义一个属性，或者修改现有的属性，并返回此对象; 缺点，object.defineProperty只能监听属性读取或写入,无法监听属性添加或删除；对于数组对象的监听，需要重写数组的方法，比如push等
// Object.defineProperty通过将属性转换为 getter/setter，get语法将对象属性绑定到查询该属性时将被调用的函数。

var obj = {
    foo: 1,
    bar: 2
};
var obj = Object.defineProperties(obj, {
    "foo": {
        get: function () {
            console.log("Get:" + this.foo);
        },
        set: function (val) {
            console.log("Set:" + val);
            foo = val
            // this.value = val;
        }
    },

    "bar": {
        get: function () {
            console.log("Get:" + this.bar);
        },
        set: function (val) {
            console.log("Set:" + val);
            bar = val
            // this.value = val;
        }
    }
});
obj.foo = 10

// ES6中proxy：ES6代理实现数据绑定，实际上我们依然是使用 getter/setter 只不过我们没有在对象上设置，而是代理了 getter/setter 的行为。
// proxy：可以监听对象属性删除或添加，读取或写入，以及方法的调用；可以直接监视数组的变化; 返回的代理是一个数组对象
const person = {
    name: 'tom',
    age: 19
}

const personProxy = new Proxy(person, {
    get: function(target, prop){
        return prop in target ? target[prop] : undefined
    },
    // 验证：实现对age属性，必须为整数
    set: function(obj, prop, value) {
        if(prop == 'age') {
            if(!Number.isInteger(value)) {
                throw new TypeError("the age is not an interger")
            }
            if(val > 200) {
                throw new TypeError("the age seems invaild")
            }
            obj[age] = value

            return true
        }
        
    }
})

person.a 