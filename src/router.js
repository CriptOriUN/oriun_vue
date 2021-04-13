import vueRouter from 'vue-router'
import App from './App'
import Login from './components/Login'
import CreateEvent from './components/CreateEvent'
import Welcome from './components/Welcome'
import User from './components/User'
import Bienestar from './components/Bienestar'
import Moderator from './components/Moderator'

const router = new vueRouter({
    mode: 'history',
    base: __dirname,
    routes: [{
            path: '/',
            name: "root",
            component: App
        },
        {
            path: '/login',
            name: "Login",
            component: Login
        },
        {
            path: '/:username/createevent',
            name: "CreateEvent",
            component: CreateEvent
        },
        {
            path: '/:username/welcome',
            name: "Welcome",
            component: Welcome
        },
        {
            path: '/:username/User',
            name: "User",
            component: User
        },
        {
            path: '/:username/moderator',
            name: "Moderator",
            component: Moderator
        },
        {
            path: '/:username/bienestar',
            name: "Bienestar",
            component: Bienestar
        }
    ]
})
export default router