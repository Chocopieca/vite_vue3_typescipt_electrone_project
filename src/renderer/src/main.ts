import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import initPinia from "./plugins/InitPinia";
import router from './router'

const app = createApp(App)

app.use(initPinia)
app.use(router)

app.mount('#app')
