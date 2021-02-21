/**
 * 要求：模拟实现 bind 函数
 * bind():方法会创建一个新函数A。当函数A被调用时，bind()的第一个参数会作为它运行时的this，之后的一序列参数将会在实参前传入作函数A的参数。
 * 实现的注意事项：
 * 1. bind返回函数可能有返回值，因此要return函数
 * 2. bind可以传入第二个参数，以及在新函数A中传入参数，作为调用者的实参
 * 3. bind创建的函数在作为构造函数使用时，即使用new创建实例，this指向会失效，因为使用new，而指向了obj
 */

Function.prototype.bind3 = function(context) {
    var self = this
    var args = Array.prototype.slice.call(arguments, 1)
    var fBound = function() {
        var bindArgs = Array.prototype.slice.call(arguments)
        return self.apply(this instanceof fBound ? this : context, args.concat(bindArgs))
    }
    fBound.prototype = this.prototype
    return fBound
}