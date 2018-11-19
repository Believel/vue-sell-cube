<template>
    <div class="header" @click="detailShow">
      <!-- 头部内部 -->
      <div class="content-wrapper">
         <div class="avatar">
          <img :src="seller.avatar" height="64" width="64">
         </div>
         <div class="content">
          <div class="title">
            <span class="brand"></span>
            <span class="name">{{seller.name}}</span>
          </div>
          <div class="description">
            {{seller.description}}/{{seller.deliveryTime}}分钟送达
          </div>
          <div class="support" v-if="seller.supports">
            <support-icon :type="seller.supports[0].type" :size="size" class="icon"></support-icon>
            <span class="text">{{seller.supports[0].description}}</span>
          </div>
         </div>
         <!-- 广告个数 -->
         <div class="support-count" v-if="seller.supports" @click="detailShow">
          <span class="count">{{seller.supports.length}}个</span>
          <i class="icon-keyboard_arrow_right"></i>
         </div>
      </div>
      <!-- 头部公告 -->
      <div class="bulletin-wrapper">
        <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
      <!-- 头部背景布局 -->
      <div class="background">
        <img :src="seller.avatar" width="100%" height="100%">
      </div>
     
  </div>
</template>
<script>
    import SupportIcon from 'components/support-ico/support-icon'
    export default {
        props: {
            seller: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        data() {
            return {
                size: 1
            }
        },
        methods: {
            detailShow() {
                // 返回的是一个组件的实例
                this.headerDetailComp = this.headerDetailComp || this.$createHeaderDetail({
                    // 如果使用vue的配置项，属性前面添加$
                    $props: {
                        // 值如果是字符串，可以是响应式的
                        seller: 'seller'
                    }
                })
                this.headerDetailComp.show()
            }
        },
        components: {
            SupportIcon
        }
    }
</script>

<style lang="stylus" scoped>
@import "~common/stylus/mixin";
@import "~common/stylus/variable";
    .header
        position: relative
        overflow: hidden
        color: #fff
        background: $color-background-ss
        .content-wrapper
            position: relative
            padding: 24px 12px 18px 24px
            font-size: 0
            .avatar
                vertical-align: top
                display: inline-block
                img
                    border-radius: 2px
            .content
                display: inline-block
                margin-left: 16px
                font-size: $fontsize-medium
                .title
                    margin: 2px 0 8px 0
                    .brand
                        vertical-align: top
                        display:inline-block
                        width: 30px
                        height: 18px
                        bg-image('brand')
                        background-size:30px 18px
                        background-repeat: no-repeat
                    .name
                        font-size: $fontsize-large
                        font-weight: bold
                        line-height: 18px
                        margin-left: 6px
                .description
                    font-size: $fontsize-small
                    margin-bottom: 10px
                .support 
                    .icon 
                        margin-right: 4px 
                    .text
                        font-size: $fontsize-small-s
                        line-height: 12px
            .support-count
                position: absolute
                right: 12px
                bottom: 18px
                height: 24px
                padding: 0 8px
                background: rgba(0, 0, 0, 0.2)
                text-align: center
                border-radius: 14px
                .count
                    font-size: $fontsize-small-s
                    border: none
                .icon-keyboard_arrow_right
                    margin-left: 2px
                    line-height: 24px
                    font-size: $fontsize-small-s
        .bulletin-wrapper
            background: $color-background-sss
            position: relative
            height: 28px
            line-height: 28px
            padding: 0 22px 0 12px
            white-space: nowrap
            overflow: hidden
            text-overflow: ellipsis
            .bulletin-title
                vertical-align: top
                margin-top: 8px
                display: inline-block
                margin-right: 4px
                width: 22px
                height: 12px
                bg-image ('bulletin')
                background-size: 22px 12px
                background-repeat: no-repeat
            .bulletin-text
                font-size: $fontsize-small-s
                line-height: 28px
            .icon-keyboard_arrow_right
                position: absolute
                right: 12px
                top: 8px
                font-size: $fontsize-small-s
                margin-left: 4px
        .background
            position: absolute
            left: 0
            top: 0
            width:100%
            height:100%
            z-index: -1
            filter: blur(10px)

</style>
