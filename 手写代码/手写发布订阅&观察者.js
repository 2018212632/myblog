/**
 * 题目：手写发布订阅/观察者模式
 */
// 发布订阅：subject(主题)、observer(订阅者)；主题有添加订阅者、删除订阅者、通知(notify)方法（遍历所有订阅者，执行订阅者更新方法）
// 实现思路：创建主题（class），订阅者（class）拥有更新方法，当订阅者订阅主题后，添加进数组；主题有添加和删除订阅的功能，以及更新功能（遍历整个订阅数组，执行添加的回调）
class subject {
    observers = []

    addObserver(observer) {
        this.observers.push(observer)
    }

    removeObserver(observer) {
        let index = this.observers.indexOf(observer)
        if (index > -1) {
            this.observers.splice(index, 1)
        }
    }

    notify() {
        this.observers.forEach((observer) => {
            observer.update()
        })
    }
}

class observer {
    update() {
        console.log("update!")
    }

    subjectTo(subject) {
        subject.addObserver(this)
    }
}


// 观察者模式：观察者eventBus，包含on监听事件，fire触发监听事件，off移除监听；
// 实现思路：只有一个监听者，监听为一个对象，监听一种事件类型type，type为key，对应的回调是value；发布事件(type, data)，对监听的事件遍历它的回调函数数组，并执行传入的data
class eventBus {
    map = {}

    on(type, handle) {
        this.map[type] = (this.map[type] || []).concat(handle)
    }

    fire(type, data) {
        this.map[type] && this.map[type].forEach((handle) => {
            handle(data)
        })
    }

    off(type, handle) {
        if(this.map[type]) {
            if(!handle) {
                delete this.map[type]
            } else {
                let index = this.map[type].indexOf(handle)
                this.map[type].splice(index, 1)
            }
        }
    }
}

let eventBus1 = new eventBus()
eventBus1.on('click btn:', (data) => {
    console.log(data)
})
eventBus1.fire('click btn:', { a: 1, b: 2 })
eventBus1.off('click btn:')
eventBus1.fire('click btn:', { a: 1, b: 2 })