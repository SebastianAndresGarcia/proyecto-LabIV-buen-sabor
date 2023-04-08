import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
export const eventBus = new Vue();

Vue.config.productionTip = false

import GAuth from 'vue-google-oauth2'
const gauthOption = {
  clientId: '718567861607-j4em7bfk0olk22ecvuulcl7nqucmf6a7.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'consent',
  plugin_name: 'PLUGIN',
  fetch_basic_profile: true
}
Vue.use(GAuth, gauthOption)
new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
