<template>
    <div class="tab">
        <cube-tab-bar show-slider v-model="selectedLabel" :data="tabs" :useTransition="false" ref="tabbar">
        </cube-tab-bar>
        <div class="slide-wrapper">
            <cube-slide ref="slide" :data="tabs" :initial-index="index" :show-dots="false" @change="changePage" :loop="false" :auto-play="false" :options="slideOptions" @scroll="scroll">
                <cube-slide-item v-for="(tab, index) in tabs" :key="index">
                    <component :is="tab.component" :data="tab.data" ref="component"></component>
                </cube-slide-item>
            </cube-slide>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'tab',
        props: {
            tabs: {
                type: Array,
                default() {
                    return {}
                }
            },
            initialIndex: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                index: this.initialIndex,
                slideOptions: {
                    listenScroll: true,
                    probeType: 3,
                    directionLockThreshold: 0,
                    eventPassthrough: 'vertical' 

                }
            }
        },
        computed: {
            selectedLabel: {
                get() {
                    return this.tabs[this.index].label
                },
                set(newval) {
                    // tab头部切换，设置内容索引改变
                    this.index = this.tabs.findIndex((value) => {
                        return value.label === newval
                    })
                }
            }
        },
        mounted() {
            this.changePage(this.index)
        },
        methods: {
            // current当前滑动改变的索引
            changePage(current) {
                // slide内容滑动设置对应的tab头部内容改变
                this.index = current
                const component = this.$refs.component[current]
                if (component && component.getGoods) {
                    component.getGoods()
                }
            },
            // 实时派发滚动的距离,如果使用了就把默认的useTransition属性设置为false,要不然会有冲突
            scroll(pos) {
                const tabbarWidth = this.$refs.tabbar.$el.clientWidth
                const slideWidth = this.$refs.slide.slide.scrollerWidth
                const transform = -pos.x / slideWidth * tabbarWidth
                // 手动设置tab头部的transform值
                this.$refs.tabbar.setSliderTransform(transform)
            }
        }
    }
</script>

<style lang="stylus" scoped>
.tab {
    display: flex;
    flex-direction: column;
    height: 100%;

    >>> .cube-tab {
        padding: 10px 0;
    }

    .slide-wrapper {
        flex: 1;
        overflow: hidden;
    }
}
</style>
