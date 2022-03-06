var StatusType;
(function (StatusType) {
    StatusType["pending"] = "pending";
    StatusType["fulfilled"] = "fulfilled";
    StatusType["rejected"] = "rejected";
})(StatusType || (StatusType = {}));
function resolvePromise(promise, x, resolve, reject) {
    if (promise === x)
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'));
    if (typeof x === 'object' || typeof x === 'function') {
        if (x === null)
            return resolve(x);
        let then;
        try {
            then = x.then;
        }
        catch (error) {
            return reject(error);
        }
        if (typeof then === 'function') {
            let called = false;
            try {
                then.call(x, (y) => {
                    if (called)
                        return;
                    called = true;
                    resolvePromise(promise, y, resolve, reject);
                }, (r) => {
                    if (called)
                        return;
                    called = true;
                    reject(r);
                });
            }
            catch (error) {
                if (called)
                    return;
                reject(error);
            }
        }
        else {
            resolve(x);
        }
    }
    else {
        resolve(x);
    }
}
export class MyPromise {
    constructor(executor) {
        this.status = StatusType.pending;
        this.value = null;
        this.reason = null;
        this.onFulfilledCallback = [];
        this.onRejectedCallback = [];
        this.resolve = (value) => {
            if (this.status === StatusType.pending) {
                this.status = StatusType.fulfilled;
                this.value = value;
                while (this.onFulfilledCallback.length) {
                    this.onFulfilledCallback.shift()(value);
                }
            }
        };
        this.reject = (reason) => {
            if (this.status === StatusType.pending) {
                this.status = StatusType.rejected;
                this.reason = reason;
                while (this.onRejectedCallback.length) {
                    this.onRejectedCallback.shift()(reason);
                }
            }
        };
        try {
            executor(this.resolve, this.reject);
        }
        catch (error) {
            this.reject(error);
        }
    }
    then(onFulfilled, onRejected) {
        const fulfilledCallback = typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
        const rejectedCallback = typeof onRejected === 'function' ? onRejected : (reason) => { throw reason; };
        const thenPromise = new MyPromise((resolve, reject) => {
            const fulfilledMicrotask = () => {
                queueMicrotask(() => {
                    try {
                        const x = fulfilledCallback(this.value);
                        resolvePromise(thenPromise, x, resolve, reject);
                    }
                    catch (error) {
                        reject(error);
                    }
                });
            };
            const rejectedMicrotask = () => {
                queueMicrotask(() => {
                    try {
                        const x = rejectedCallback(this.reason);
                        resolvePromise(thenPromise, x, resolve, reject);
                    }
                    catch (error) {
                        reject(error);
                    }
                });
            };
            if (this.status === StatusType.fulfilled) {
                fulfilledMicrotask();
            }
            else if (this.status === StatusType.rejected) {
                rejectedMicrotask();
            }
            else if (this.status === StatusType.pending) {
                this.onFulfilledCallback.push(fulfilledMicrotask);
                this.onRejectedCallback.push(rejectedMicrotask);
            }
        });
        return thenPromise;
    }
    catch(errCallback) {
        return this.then(null, errCallback);
    }
    finally(callback) {
        const finallyResolve = (value) => MyPromise.resolve(callback()).then(() => value);
        const finallyReject = (reason) => MyPromise.resolve(callback()).then(() => { throw reason; });
        return this.then(finallyResolve, finallyReject);
    }
}
MyPromise.resolve = (preload) => {
    if (preload instanceof MyPromise) {
        return preload;
    }
    return new MyPromise(resolve => resolve(preload));
};
MyPromise.reject = (preload) => {
    return new MyPromise((resolve, reject) => reject(preload));
};
// 下面的是使用promises-aplus-tests库验证promise需要加上的
// (MyPromise as any).deferred = function () {
//   var result: any = {};
//   result.promise = new MyPromise(function (resolve, reject) {
//     result.resolve = resolve;
//     result.reject = reject;
//   });
//   return result;
// }
// module.exports = MyPromise;
//# sourceMappingURL=myPromise.js.map