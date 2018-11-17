/**
 * 事件触发器
 */
class Emitter {
  constructor() {
    this.e = {}; // 事件队列
  }

  // 绑定事件
  on(name, fn, ctx) {
    let eventArr = this.e[name] || (this.e[name] = []);
    eventArr.push({fn, ctx});
  }

  // 绑定只触发一次的事件
  once(name, fn, ctx) {
    const _this = this;
    function listener() {
      _this.off(name, listener);
      fn.apply(ctx, arguments);
    }

    this.on(name, listener, ctx);
  }

  // 触发事件
  emit(name) {
    const arg = Array.prototype.slice.call(arguments, 1);
    let eventArr = this.e[name] || (this.e[name] = []);

    eventArr.forEach(item => item.fn.apply(item.ctx, arg));
  }

  // 移除事件，有fn参数，则移除该事件的fn响应函数，若无，则移除所有
  off(name, fn) {
    let eventArr = this.e[name] || (this.e[name] = []);
    let liveEvent = [];

    fn && eventArr.forEach(item => {
      if (item.fn !== fn) {
        liveEvent.push(item);
      }
    });

    liveEvent.length ? (this.e[name] = liveEvent) : delete this.e[name];
  }
}