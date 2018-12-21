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