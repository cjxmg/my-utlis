<template>
    <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
        @before-leave="beforeLeave"
        @leave="leave"
        @after-leave="afterLeave"
    >
        <slot/>
    </transition>
</template>

<script>
export default {
    name: 'dropdown-transition',

    methods: {
        beforeEnter(el) {
            el.style.height = 0;
        },

        enter(el) {
            if (el.scrollHeight !== 0) {
                el.style.height = el.scrollHeight + 'px';
            } else {
                el.style.height = '';
            }
        },

        afterEnter(el) {
            el.style.height = '';
        },

        beforeLeave(el) {
            el.style.height = el.scrollHeight + 'px';
        },

        leave(el) {
            if (el.scrollHeight !== 0) {
                el.style.height = 0;
            }
        },

        afterLeave(el) {
            el.style.height = '';
        }
    }
};
</script>
