<template>
  <div id="app">
    <!-- 头部内容 -->
    <v-header :seller="seller"></v-header>
    <!-- tab内容 -->
    <div class="tab-wrapper">
      <tab :tabs="tabs"></tab>
    </div>
  </div>
</template>

<script>
import VHeader from 'components/v-header/v-header'
import Tab from 'components/tab/tab'
import Goods from 'components/goods/goods'
import Ratings from 'components/ratings/ratings'
import Seller from 'components/seller/seller'
import { getSeller } from 'model/api'

export default {
  name: 'app',
  data() {
    return {
      seller: {}
    }
  },
  computed: {
    tabs() {
      return [{
        label: '商品', component: Goods, data: { seller: this.seller }
      }, {
        label: '评分', component: Ratings, data: { seller: this.seller }
      }, {
        label: '商家', component: Seller, data: { seller: this.seller }
      }]
    }
  },
  created() {
    this._getSeller()
  },
  methods: {
    async _getSeller() {
      try {
        let res = await getSeller()
        // 成功响应 reslove
        if (res.errno === 0) {
          this.seller = res.data
        }
      } catch (error) {
        // 失败响应reject
        console.log(error)
      } finally {

      }
    }
  },
  components: {
    VHeader,
    Tab
  }
}
</script>
<style lang="stylus" scoped>
#app
  .tab-wrapper
    position: fixed
    top: 136px
    left: 0
    right: 0
    bottom: 0
</style>
