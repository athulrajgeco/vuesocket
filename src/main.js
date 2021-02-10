import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import io from 'socket.io-client'
Object.defineProperty(Vue.prototype, '$io', { value: io });
Object.defineProperty(Vue.prototype, '$server', { value: 'http://localhost:3000/' });

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
