import { createAPI } from 'cube-ui'
import Vue from 'vue'
import HeaderDetail from 'components/header-detail/header-detail'
import ShopCartList from 'components/shop-cart-list/shop-cart-list'
// 把组件挂在到Vue.prototype上
// 然后可以通过this.$createHeaderDetail访问组件实例相关内容
createAPI(Vue, HeaderDetail) 
createAPI(Vue, ShopCartList)
