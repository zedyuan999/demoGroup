enum StatusType {
  pending = 'pending',
  fulfilled = 'fulfilled',
  rejected = 'rejected'
}
type Execute = <T>(preload?: T) => MyPromise | T | void
type Executor = (resolve: Execute, reject: Execute) => void
type Status = keyof typeof StatusType
function resolvePromise(promise: MyPromise, x: unknown, resolve: Execute, reject: Execute) {
  if (promise === x) return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  if (typeof x === 'object' || typeof x === 'function') {
    if (x === null) return resolve(x);
    let then;
    try {
      then = (x as MyPromise).then;
    } catch (error) {
      return reject(error);
    }
    if (typeof then === 'function') {
      let called = false;
      try {
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            resolvePromise(promise, y, resolve, reject);
          },
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          });
      } catch (error) {
        if (called) return;
        reject(error);
      }
    } else {
      resolve(x);
    }
  } else {
    resolve(x);
  }
}
export class MyPromise {
  constructor(executor: Executor) {
    try {
      executor(this.resolve, this.reject)
    } catch (error) {
      this.reject(error)
    }
  }
  status: Status = StatusType.pending
  value: unknown = null
  reason: unknown = null
  onFulfilledCallback: Execute[] = []
  onRejectedCallback: Execute[] = []
  resolve: <T>(value: T) => void = (value) => {
    if (this.status === StatusType.pending) {
      this.status = StatusType.fulfilled
      this.value = value
      while (this.onFulfilledCallback.length) {
        (this.onFulfilledCallback.shift() as (Execute))(value)
      }
    }
  }
  reject: <T>(reason: T) => void = (reason) => {
    if (this.status === StatusType.pending) {
      this.status = StatusType.rejected
      this.reason = reason
      while (this.onRejectedCallback.length) {
        (this.onRejectedCallback.shift() as (Execute))(reason)
      }
    }
  }
  static resolve = <T>(preload: T): MyPromise => {
    if (preload instanceof MyPromise) {
      return preload
    }
    return new MyPromise(resolve => resolve(preload))
  }
  static reject = <T>(preload: T): MyPromise => {
    return new MyPromise((resolve, reject) => reject(preload))
  }
  then(onFulfilled?: Execute | null, onRejected?: Execute | null) {
    const fulfilledCallback = typeof onFulfilled === 'function' ? onFulfilled : <T>(value: T) => value
    const rejectedCallback = typeof onRejected === 'function' ? onRejected : <T>(reason: T) => { throw reason }
    const thenPromise = new MyPromise((resolve: Execute, reject: Execute) => {
      const fulfilledMicrotask = () => {
        queueMicrotask(() => {
          try {
            const x = fulfilledCallback(this.value)
            resolvePromise(thenPromise, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }
      const rejectedMicrotask = () => {
        queueMicrotask(() => {
          try {
            const x = rejectedCallback(this.reason)
            resolvePromise(thenPromise, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }
      if (this.status === StatusType.fulfilled) {
        fulfilledMicrotask()
      } else if (this.status === StatusType.rejected) {
        rejectedMicrotask()
      } else if (this.status === StatusType.pending) {
        this.onFulfilledCallback.push(fulfilledMicrotask)
        this.onRejectedCallback.push(rejectedMicrotask)
      }
    })
    return thenPromise
  }
  catch(errCallback: Execute) {
    return this.then(null, errCallback)
  }
  finally(callback: Execute) {
    const finallyResolve: Execute = (value) => MyPromise.resolve(callback()).then(() => value)
    const finallyReject: Execute = (reason) => MyPromise.resolve(callback()).then(() => { throw reason })
    return this.then(finallyResolve, finallyReject)
  }
}

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
