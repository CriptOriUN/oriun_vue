import vueRouter from 'vue-router'
import App from './App'
import Login from './components/Login'
import CreateEvent from './components/CreateEvent'
import Welcome from './components/Welcome'
import User from './components/User'
import Bienestar from './components/Bienestar'
import Moderator from './components/Moderator'
import RegisterModerator from './components/RegisterModerator'
import AddStock from './components/AddStock'
import AddLocation from './components/AddLocation'
import Searcher from './components/Searcher'
import Elements from './components/Elements'
import Confirmation from './components/Confirmation'

const router = new vueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
        {
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
        }, 
        {
            path:'/:username/registermoderator',
            name: "RegisterModerator", 
            component: RegisterModerator
        }, 
        {
            path:'/:username/addstock',
            name: "AddStock", 
            component: AddStock
        }, 
        {
            path:'/:username/addlocation',
            name: "AddLocation", 
            component: AddLocation
        }, 
        {
            path:'/:username/searcher', 
            name: "Searcher", 
            component: Searcher
        }, 
        {
            path:'/:username/elements', 
            name: "Elements", 
            component: Elements
        }, 
        {
            path:'/confirm-account', 
            name: "Confirmation", 
            component: Confirmation
        },
        // {
        //     path: '/:pathMatch(.*)*',
        //     component: Login
        // },

    ]
})
export default router