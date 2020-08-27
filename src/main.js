import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'
import VueAxios from 'vue-axios'
// import VueAMap from 'vue-amap'
// import libFlexible from 'lib-flexible'
import dataV from '@jiaminghi/data-view'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import plTable from 'pl-table'
import 'pl-table/themes/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueAxios, Axios)
Vue.use(dataV)
Vue.use(plTable);
// Vue.use(VueAMap)
// Vue.use(libFlexible)

// VueAMap.initAMapApiLoader({
//   key: '7ec041834ee3cfa942049b896b1abb22',
//   uiVersion: '1.1',
// });


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
