import { createApp } from 'vue'
import App from './App.vue'
import registerStore from './store'
import registerRouter from './router'
import 'normalize.css'
import '@/assets/css/vant.less'

const app = createApp(App)

// store
registerStore(app)

// router
registerRouter(app)

app.mount('#app')
