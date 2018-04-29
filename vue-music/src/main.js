import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import store from './store'
import { SET_PLAY_HISTORY, SET_FAVORITE_LIST } from './store/mutation-types'
import { processSongsUrl } from 'common/js/song'
import { loadPlay, loadFavorite } from 'common/js/cache'
import VueLazyload from 'vue-lazyload'
import 'common/stylus/index.styl'
Vue.config.productionTip = false
fastclick.attach(document.body)
Vue.use(VueLazyload, {
  loading: require('common/image/default.png')
})


new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
