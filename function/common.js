/**
 * 常用小函数
 */

/**
 * 去除对象中指定的属性
 * @param {object} obj 要处理的对象
 * @param  {...any} keysToOmit 需要去除的属性集合
 */
function omit(obj, ...keysToOmit) {
    return Object.keys(obj).reduce((acc, key) => {
        if (keysToOmit.indexOf(key) === -1) acc[key] = obj[key];
        return acc;
    }, {});
}

/**
 * 时间格式化，对象形式
 * @param {Object} date 时间对象
 * @param {string} format 时间格式规范
 * @return {string} 时间戳
 */
export function dateFormat(date, format) {
    const o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        'S': date.getMilliseconds()
    };
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
        if (new RegExp('(' + k + ')').test(format)) {
            format = format.replace(RegExp.$1,
                RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
        }
    }
    return format;
}

/**
 * 函数防抖
 * @param {Function} fn 回调函数
 * @param {number} delay 延迟时间
 * @return {Function} 返回函数
 */
export function debounce(fn, delay) {
    let timeout;
    return function (...rest) {
        if (timeout) {
            clearTimeout(timeout);
        }
        let context = this;
        let arg = rest;
        timeout = setTimeout(() => {
            fn.apply(context, arg);
        }, delay);
    }
}

/**
 * 函数节流
 * @param {Function} fn 回调函数
 * @param {number} threshold 阈值
 * @return {Function} 返回函数
 */
export function throttle(fn, threshold) {
    let start = new Date().getTime();
    let timeout;
    return function (...rest) {
        if (timeout) {
            clearTimeout(timeout);
        }
        let curTime = new Date().getTime();
        let context = this;
        let arg = rest;
        let diff = start - curTime;
        if (diff >= threshold) {
            fn.apply(context, arg);
        } else {
            timeout = setTimeout(function () {
                fn.apply(context, arg);
            }, threshold);
        }
        start = curTime;
    }
}