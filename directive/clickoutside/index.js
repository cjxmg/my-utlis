/**
 * @file vue指令
 * 
 * 当点击元素外部时，触发绑定的方法
 * 
 * @example 
 *     <div v-clickoutside="method"></div>
 */

import { on } from './utils';

var nodeList = [];
var ctx = '__clickoutside_';
var startEvent;
var seed = 0;

on(document, 'mousedown', e => startEvent = e);

on(document, 'mouseup', (e) => {
    nodeList.forEach(node => node[ctx].documentHendler(startEvent, e));
});

function createDocumentHendler(el, methodName, vnode) {
    return function (startEvent, endEvent) {
        if (
            !vnode ||
            !startEvent.target ||
            !endEvent.target ||
            el.contains(startEvent.target) ||
            el.contains(endEvent.target)
        ) return;

        if (methodName && vnode.context[methodName]) {
            vnode.context[methodName]();
        } else {
            el[ctx].bindFn && el[ctx].bindFn();
        }
    }
}

export default {
    bind(el, binding, vnode) {
        nodeList.push(el);
        el[ctx] = {
            documentHendler: createDocumentHendler(el, binding.expression, vnode),
            id: seed++,
            methodName: binding.expression,
            bindFn: binding.value
        }
    },
    unbind(el) {
        for (let i = 0; i < nodeList.length; i++) {
            const node = nodeList[i];
            if (node[ctx].id === el[ctx].id) {
                nodeList.splice(i, 1);
                break;
            }
        }
    }
}
