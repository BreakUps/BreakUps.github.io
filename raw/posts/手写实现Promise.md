# 手写实现Promise

[Promises/A+](https://promisesaplus.com/)定义了ES6中`Promise`的标准，以下是手写的一种符合该标准的实现代码：

```javascript
const STATUS_PENDING = 0;
const STATUS_FULFILLED = 1;
const STATUS_REJECTED = 2;
const STATUS_RESOLVED = 3; // RESOLVED but not FULFILLED yet

class MyPromise {
    constructor(executor) {
        this._status = STATUS_PENDING;
        this._value = undefined;
        this._reason = undefined;
        this._onFulfilledCallbacks =  [];
        this._onRejectedCallbacks = [];
        const resolve = (value) => {
            if(this._status === STATUS_PENDING) {
                this._status = STATUS_RESOLVED;
                const fulfill = (v) => {
                    if(this._status === STATUS_RESOLVED) {
                        this._status = STATUS_FULFILLED;
                        this._value = v;
                        setTimeout(() => {
                            this._onFulfilledCallbacks.forEach((callback) => {
                                callback(v)
                            });
                        }, 0);
                    }
                }
                if((typeof value?.then) === 'function') {
                    try {
                        value.then(fulfill, reject);
                    } catch(err) {
                        reject(err);
                    }
                } else {
                    fulfill(value);
                }
            }
        }

        const reject = (reason) => {
            if(this._status === STATUS_PENDING || this._status === STATUS_RESOLVED) {
                this._status = STATUS_REJECTED;
                this._reason = reason;
                setTimeout(() => {
                    this._onRejectedCallbacks.forEach((callback) => {
                        callback(reason);
                    })
                }, 0);
                
            }
        }
        try{
            executor(resolve, reject);
        } 
        catch(err) {
            reject(err);
        }
    }

    then(onFulfilled, onRejected) {
        const p = new MyPromise((resolve, reject) => {
            const callback = (fn, result) => {
                try{
                    const returnValue = fn(result);
                    if(returnValue === p) {
                        throw TypeError("`onFulfilled` returns a value that === p");
                    }
                    resolve(returnValue);
                } catch(err) {
                    reject(err);
                }
            }
            if(this._status === STATUS_PENDING || this._status === STATUS_RESOLVED) {
                if((typeof onFulfilled) === 'function') {
                    this._onFulfilledCallbacks.push(callback.bind(null, onFulfilled));
                } else {
                    this._onFulfilledCallbacks.push((value) => {
                        resolve(value);
                    })
                }
                if((typeof onRejected) === 'function') {
                    this._onRejectedCallbacks.push(callback.bind(null, onRejected));
                } else {
                    this._onRejectedCallbacks.push((reason) => {
                        reject(reason);
                    })
                }
            } else if(this._status === STATUS_FULFILLED) {
                if((typeof onFulfilled) === 'function') {
                    setTimeout(() => {
                        callback(onFulfilled, this._value);
                    }, 0);
                } else {
                    resolve(this._value);
                }
            } else if(this._status === STATUS_REJECTED) {
                if((typeof onRejected) === 'function') {
                    setTimeout(() => {
                        callback(onRejected, this._reason);
                    }, 0);
                } else {
                    reject(this._reason);
                }
            }
        });
        return p;
    }

    catch(onRejected) {
        return this.then(undefined, onRejected);
    }

    static resolve(value) {
        if(value instanceof MyPromise) {
            return value;
        }
        return new MyPromise((resolve) => {
            resolve(value);
        })
    }

    static reject(reason) {
        return new MyPromise((_, reject) => {
            reject(reason);
        })
    }
}
```

