import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import HeaderBox from './components/HeaderBox.vue';
import UserAsideBox from './components/UserAsideBox.vue';
import AdminAsideBox from './components/AdminAsideBox.vue'
import RepairAsideBox from './components/RepairAsideBox.vue'
import UserRepairDetail from './components/UserRepairDetail.vue'
import EchartsComponent from "@/components/EchartsComponent.vue";
import EchartsComponentRepair from "@/components/EchartsComponentRepair.vue";

Vue.use(ElementUI)

Vue.prototype.$axios = axios
Vue.prototype.$baseUrl = "http://10.251.252.201:8001/api/"

Vue.config.productionTip = false
Vue.component("HeaderBox", HeaderBox)
Vue.component("UserAsideBox", UserAsideBox)
Vue.component("AdminAsideBox", AdminAsideBox)
Vue.component("RepairAsideBox", RepairAsideBox)
Vue.component('UserRepairDetail', UserRepairDetail)
Vue.component('EchartsComponent', EchartsComponent)
Vue.component('EchartsComponentRepair', EchartsComponentRepair)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
