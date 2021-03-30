import vueRouter from 'vue-router' 
import App from './App' 

const router = new vueRouter({
    mode: 'history',
    base: __dirname,
    routes: [{
            path: '/',
            name: "root",
            component: App
    }
    ]
})
export default router
