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
import DispEspacio from './components/DispEspacio'
import UnlockAccount from './components/UnlockAccount'
import RentalElements from './components/RentalElements'
import PasswordRecover from './components/PasswordRecover'
import PasswordChange from './components/PasswordChange'

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
            component: CreateEvent,
            props: true
        },
        {
            path: '/:username/welcome',
            name: "Welcome",
            component: Welcome, 
            props: true
        },
        {
            path: '/:username/User',
            name: "User",
            component: User, 
            props: true
        },
        {
            path: '/:username/moderator',
            name: "Moderator",
            component: Moderator, 
            props: true
        },
        {
            path: '/:username/bienestar',
            name: "Bienestar",
            component: Bienestar, 
            props: true
        },
        {
            path: '/:username/registermoderator',
            name: "RegisterModerator",
            component: RegisterModerator
        },
        {
            path: '/:username/addstock',
            name: "AddStock",
            component: AddStock
        },
        {
            path: '/:username/addlocation',
            name: "AddLocation",
            component: AddLocation
        },
        {
            path: '/:username/searcher',
            name: "Searcher",
            component: Searcher,
            props: true
        },
        {
            path: '/:username/elements',
            name: "Elements",
            component: Elements,
            props: true
        },
        {
            path: '/confirm-account',
            name: "Confirmation",
            component: Confirmation
        },
        {
            path: '/:username/DispEspacio',
            name: "DispEspacio",
            component: DispEspacio,
            props: true
        },
        {
            path: '/unlock-account',
            name: "UnlockAccount",
            component: UnlockAccount
        },
        {
            path: '/password-reset',
            name: "PasswordRecover",
            component: PasswordRecover
        },
        {
            path: '/password-change',
            name: "PasswordChange",
            component: PasswordChange
        },
        {
            path: '/:username/rental-elements', 
            name: "RentalElements",
            component: RentalElements
        }
    ]
})
export default router