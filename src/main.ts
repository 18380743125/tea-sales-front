import { createApp } from 'vue'
import { Lazyload } from 'vant'
import App from './App.vue'
import registerStore from './store'
import registerRouter from './router'
import 'normalize.css'

const app = createApp(App)

// store
registerStore(app)

// router
registerRouter(app)

app.use(Lazyload)

app.mount('#app')
