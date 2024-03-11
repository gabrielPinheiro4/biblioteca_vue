import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.config.globalProperties.modal = 'Livro ou usuário não encontrado'
app.config.globalProperties.desc = 'O livro ou usuário que você digitou não consta ' +
                                            'no sistema, verifique novamente os dados digitados'
app.mount('#app')
