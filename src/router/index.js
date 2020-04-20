import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../pages/Home'
import alarm from '../pages/alarm'

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
    path : '/',
    redirect : 'home'
}
]

const router = new VueRouter({
    routes
})

export default router