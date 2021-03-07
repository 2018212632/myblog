/**
 * 题目：手动实现 promise.all、promise.race、promise.finally
 */

// promise.all ,接受一个数组（可遍历对象）包含promise，返回一个promise实例；这个实例的resolve是所有promise resolve之后的数据结果;reject回调执行是，有一个回调reject立即执行
// 例如：Promise.all([promise1, promise2, promise3]).then((values)=>{console.log(values)}) // [value1, value2, value3] 

// promise.race：只要有一个promise执行完，就reslove

// promise.finally：不论是onfullfiled还是onrejected状态，都会执行callback函数

// promise.resolve或promise.reject返回一个新的promise，
const PENDING = "pending"
const RESOLVED = "resolved"
const REJECTED = "rejected"

const resolvePromise = (newPromise, x, resolve, reject) => {
    if(newPromise === x) {
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }
    if (typeof x === 'object' && x !== null || typeof x === 'function') {
        let called;
        try {
            let then = x.then
            if (typeof then === 'function') {
                then.call(x, y => {
                    if (called) { return }
                    called = true
                    resolvePromise(newPromise, y, resolve, reject)
                }, r => {
                    if (called) { return }
                    called = true
                    reject(r)
                })
            } else {
                // {then: 1}
                resolve(x)
            }
        } catch(e) {
            if (called) { return }
            called = true
            reject(e)
        }
    } else {
        resolve(x)
    }
}

class myPromise {
    status = PENDING
    result = undefined
    reason = undefined
    onResolvedCallback = []
    onRejectedCallback = []
    constructor(executor) {
        const resolve = (value) => {
            if(status === PENDING) {
                this.status = RESOLVED
                this.result = value

                // 异步结束后，发布函数
                this.onResolvedCallbacks.forEach(fn => fn())
            }
        }
        const reject = (reason) => {
            this.status = REJECTED
            this.reason = reason
            this.onRejectedCallback.forEach(fn => fn())
        }
        try {
            executor(resolve, reject)
        } catch (err) {
            reject(err)            
        }
    }

    then(onfullfilled, onrejected) {
        onfullfilled = typeof onfullfilled === 'function' ? onfullfilled : val => val
        onrejected = typeof onrejected === 'function' ? onrejected : e => { throw e}

        const newPromise = myPromise((resolve, reject) => {
            if(this.status === RESOLVED) {
                    setTimeout(()=>{
                        try {
                            let x = onfullfilled(this.result)// x为resolved方法返回值
                            resolvePromise(newPromise,x,resolve,reject)
                        } catch (error) {
                            reject(e)
                        }
        
                    }, 0)
            }
            if(this.status === REJECTED) {
                    setTimeout(()=>{
                        try {
                            let x = onrejected(this.reason)
                            resolvePromise(newPromise, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    }, 0)
            }
            if(this.status === PENDING) {
                this.onResolvedCallback.push(()=>{
                    setTimeout(()=>{
                        try {
                            let x = onfullfilled(this.result)// x为resolved方法返回值
                            resolvePromise(newPromise,x,resolve,reject)
                        } catch (error) {
                            reject(e)
                        }
        
                    })
                }, 0);
                this.onRejectedCallback.push(()=>{
                    setTimeout(()=>{
                        try {
                            let x = onrejected(this.reason)
                            resolvePromise(newPromise, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    })
                })
            }
        })
        return newPromise
    };
    catch() {}

    static all(promises) {
        return new myPromise((reslove, reject) => {
            const res = []
            let index = 0 // 解决多个异步的并发问题，要使用计数器；因为i会提前执行完，用计数器保证所有异步执行完毕
            let len = promises.length

            if(len === 0) {
                reslove(res)
                return
            }

            for(let i=0; i<len; i++) {
                Promise.resolve(promises[i]).then((value)=>{
                    res[i] = value
                    index++
                    if(index == len) reslove(res)
                }).catch(e=>{
                    reject(e)
                })
            }
        })
    }

    static race(promises) {
        return new myPromise((resolve, reject) => {
            let len = promises.length
            for(let i=0; i<len; i++) {
                Promise.resolve(promises[i]).then((value)=>{
                    resolve(value)
                    return
                }, (e)=>{
                    reject(e)
                    return
                })
            }
        })
    }

    static finally(cb) {
        return this.then((value)=>{
            return Promise.resolve(cb()).then(() => value)
        }, (e)=>{
            return Promise.resolve(ca()).then(() => {throw e})
        })
    }

    static resolve(value) {
        return new Promise(resolve => resolve(value))
    }

    static reject (reason) {
    return new Promise(reject => reject(reason))
    }
}