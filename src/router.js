import vueRouter from 'vue-router' 
import App from './App' 
import Login from './components/Login'
import CreateEvent from './components/CreateEvent'
import Welcome from './components/Welcome'

const router = new vueRouter({
    mode: 'history',
    base: __dirname,
    routes: [{
            path: '/',
            name: "root",
            component: App
        }, 
        {
            path:'/login', 
            name:"Login", 
            component: Login
        }, 
        {
            path:'/:username/createevent', 
            name:"CreateEvent",
            component: CreateEvent
        }, 
        {
            path:'/:username/welcome', 
            name:"Welcome", 
            component: Welcome
        }
    ]
})
export default router
