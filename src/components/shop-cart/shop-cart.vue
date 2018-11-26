<template>
    <div>
        <div class="shopcart">
            <div class="content" @click="togglelist">
                <div class="content-left">
                    <div class="logo-wrapper">
                        <div class="logo" :class="{'highlight':totalCount>0}">
                            <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
                        </div>
                        <div class="num" v-if="totalCount>0">
                            <bubble :num="totalCount"></bubble>
                        </div>
                    </div>
                    <div class="price" :class="{'highlight':totalPrice>0}">
                        ￥{{totalPrice}}
                    </div>
                    <div class="desc">
                        另需配送费￥{{deliveryPrice}}
                    </div>
                </div>
                <div class="content-right" @click="toPay">
                    <div class="pay" :class="payClass">
                        {{payDesc}}
                    </div>
                </div>
            </div>
            <!-- 需要下落的小球(默认位置是在购物车里面隐藏着多个小球) -->
            <div class="ball-container">
                <div v-for="(ball, index) in balls" :key="index">
                    <transition @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
                        <div class="ball" v-show="ball.show">
                            <div class="inner inner-hook">
                            </div>
                        </div>
                    </transition>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Bubble from 'components/bubble/bubble'
    const BALL_LEN = 10
    const innerClsHook = 'inner-hook'
    /**
     * 购物车中默认隐藏的小球，注意需要是多个，可能一下子点击多个小球
     */
    function createBalls() {
        let ret = []
        for (let i = 0; i < BALL_LEN; i++) {
            ret.push({
                show: false
            })
        }
        return ret
    }
    export default {
        name: 'shop-cart',
        props: {
            selectFoods: {
                type: Array,
                default() {
                    return []
                }
            },
            deliveryPrice: {
                type: Number,
                default: 0
            },
            minPrice: {
                type: Number,
                default: 0
            },
            // 这里的sticky的值false代表是shop-cart组件，true代表的是shop-cart-sticky组件
            sticky: {
                type: Boolean,
                default: false
            },
            fold: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                listFold: this.fold,
                balls: createBalls()
            }
        },
        computed: {
            // 总价格
            totalPrice() {
                let total = 0
                this.selectFoods.forEach(food => {
                    total += food.price * food.count
                })
                return total 
            },
            // 购买的总数
            totalCount() {
                let count = 0
                this.selectFoods.forEach((food) => {
                    count += food.count
                })
                return count
            },
            // 支付内容描述
            payDesc() {
                if (this.totalPrice === 0) {
                    return `￥${this.minPrice}元起送`
                } else if (this.totalPrice < this.minPrice) {
                    let diff = this.minPrice - this.totalPrice
                    return `还差￥${diff}元起送`
                } else {
                    return '去结算'
                }
            },
            // 跟随支付价格的变化显示不同的样式
            payClass() {
                if (!this.totalPrice || this.totalPrice < this.minPrice) {
                    return 'not-enough'
                } else {
                    return 'enough'
                }
            }
        },
        created() {
            this.dropBalls = []
            this.count = 0
        },
        methods: {
            // 去结算
            toPay(e) {
                if (this.totalPrice < this.minPrice) {
                    return 
                }
                // 注意：如果使用单例模式的话，this.totalPrice就得使用$props传入进入，否则的话就不会更新
                this.dialogComp = this.$createDialog({
                    title: '支付',
                    content: `你需要支付${this.totalPrice}元`
                })
                e.stopPropagation()
                this.dialogComp.show()
            },
            // 展开或者收起购物车列表(注：暂时还有bug)
            togglelist() {
                // alert(this.listFold)
                // 默认是收起的true
                if (this.listFold) {
                    if (!this.totalCount) {
                        return
                    }
                    this.listFold = false
                    // 显示已购物的列表
                    this._showShopCartList()
                    this._showShopCartSticky()
                } else {
                    this.listFold = true
                    this._hideShopCartList()
                }
            },
            // 记录即将下落的小球元素
            drop(el) {
                for (let i = 0; i < this.balls.length; i++) {
                    const ball = this.balls[i]
                    if (!ball.show) {
                        ball.show = true 
                        ball.el = el 
                        this.dropBalls.push(ball)
                        return
                    }
                }
            },
            // 钩子函数+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            beforeDrop(el) {
                // 找到最后添加的小球
                const ball = this.dropBalls[this.dropBalls.length - 1]
                const rect = ball.el.getBoundingClientRect()
                // 小球开始的x距离
                const x = rect.left - 32
                // 小球开始的y距离
                const y = -(window.innerHeight - rect.top - 22)
                el.style.display = ''
                el.style.transform = el.style.webkitTransform = `translate3d(0, ${y}px, 0)`
                const inner = el.getElementsByClassName(innerClsHook)[0]
                inner.style.transform = inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`
            },
            dropping(el, done) {
                // 重绘
                this._reflow = document.body.offsetHeight
                // 归位-还是归在原来的位置
                el.style.transform = el.style.webkitTransform = `translate3d(0, 0, 0)`
                const inner = el.getElementsByClassName(innerClsHook)[0]
                inner.style.transform = inner.style.webkitTransform = `translate3d(0, 0, 0)`
                el.addEventListener('transitionend', done)
            },
            afterDrop(el) {
                // 找到最前添加的小球
                const ball = this.dropBalls.shift()
                if (ball) {
                    // 隐藏小球
                    ball.show = false
                    el.style.display = 'none'
                }
            },
            // 钩子函数++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            _showShopCartList() {
                this.shopCartListComp = this.shopCartListComp || this.$createShopCartList({
                    $props: {
                        selectFoods: 'selectFoods'
                    },
                    // 派发的事件
                    $events: {
                        // 接收点击蒙层的子级派发的事件
                        hide: () => {
                            this.listFold = true
                        },
                        add: (el) => {
                            this.shopCartStickyComp.drop(el)
                        },
                        leave: () => {
                            this._hideShopCartSticky()
                        }
                    }
                })
                // 弹框显示
                this.shopCartListComp.show()
            },
            _showShopCartSticky() {
                this.shopCartStickyComp = this.shopCartStickyComp || this.$createShopCartSticky({
                    $props: {
                        selectFoods: 'selectFoods',
                        deliveryPrice: 'deliveryPrice',
                        minPrice: 'minPrice',
                        fold: 'listFold',
                        list: this.shopCartListComp
                    }
                })
                this.shopCartStickyComp.show()
            },
            _hideShopCartList() {
                const list = this.sticky ? this.$parent.list : this.shopCartListComp
                list.hide && list.hide()
            },
            _hideShopCartSticky() {
                this.shopCartStickyComp.hide()
            }
        },
        watch: {
            fold(newVal) {
                this.listFold = newVal
            },
            totalCount(count) {
                if (!this.fold && count === 0) {
                    this._hideShopCartList()
                }
            }
        },
        components: {
            Bubble
        }
    }
</script>
<style lang="stylus" scoped>
@import '~common/stylus/mixin';
@import '~common/stylus/variable';

.shopcart {
    height: 100%;

    .content {
        display: flex;
        background: $color-background;
        font-size: 0;
        color: $color-light-grey;

        .content-left {
            flex: 1;

            .logo-wrapper {
                display: inline-block;
                vertical-align: top;
                position: relative;
                top: -10px;
                margin: 0 12px;
                padding: 6px;
                width: 56px;
                height: 56px;
                box-sizing: border-box;
                border-radius: 50%;
                background: $color-background;

                .logo {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    text-align: center;
                    background: $color-dark-grey;

                    &.highlight {
                        background: $color-blue;
                    }

                    .icon-shopping_cart {
                        line-height: 44px;
                        font-size: $fontsize-large-xxx;
                        color: $color-light-grey;

                        &.highlight {
                            color: $color-white;
                        }
                    }
                }

                .num {
                    position: absolute;
                    top: 0;
                    right: 0;
                }
            }

            .price {
                display: inline-block;
                vertical-align: top;
                margin-top: 12px;
                line-height: 24px;
                padding-right: 12px;
                box-sizing: border-box;
                border-right: 1px solid rgba(255, 255, 255, 0.1);
                font-weight: 700;
                font-size: $fontsize-large;

                &.highlight {
                    color: $color-white;
                }
            }

            .desc {
                display: inline-block;
                vertical-align: top;
                margin: 12px 0 0 12px;
                line-height: 24px;
                font-size: $fontsize-small-s;
            }
        }

        .content-right {
            flex: 0 0 105px;
            width: 105px;

            .pay {
                height: 48px;
                line-height: 48px;
                text-align: center;
                font-weight: 700;
                font-size: $fontsize-small;

                &.not-enough {
                    background: $color-dark-grey;
                }

                &.enough {
                    background: $color-green;
                    color: $color-white;
                }
            }
        }
    }

    .ball-container {
        .ball {
            position: fixed;
            left: 32px;
            bottom: 22px;
            z-index: 200;
            transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);

            .inner {
                width: 16px;
                height: 16px;
                border-radius: 50%;
                background: $color-blue;
                transition: all 0.4s linear;
            }
        }
    }
}
</style>
