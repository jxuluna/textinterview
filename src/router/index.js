import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../pages/Home'
import alarm from '../pages/alarm'
import eleBox from '../pages/eleBox'
import lighting from  '../pages/lighting'
import lampmodel from '../pages/lampmodel.vue'

Vue.use(VueRouter);


const routes =[
{
    path : '/home',
    component : home
},
{
    path : '/alarm',
    component : alarm
},
{
    path : '/eleBox',
    component : eleBox
},
{
    path : '/lighting',
    component : lighting
},
{
    path:'/lampmodel',
    component: lampmodel
},
{
    path : '/',
    redirect : 'home'
}
]

const router = new VueRouter({
    routes
})

export default router