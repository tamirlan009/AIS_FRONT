import {createRouter, createWebHistory} from "vue-router";
import store from "@/store";
import Home from "@/views/Home";
import CreateOneTask from "@/views/CreateOneTask";
import RunDetection from "@/views/RunDetection";
import Login from "@/views/Login";
import TaskList from "@/components/TaskList/TaskList";
import OneTaskView from "@/views/OneTaskView";
import DetectResult from "@/views/DetectResult";
import DetectResultList from "@/views/DetectResultList";


const authGuard = function (to, from, next){
    if(store.state.authenticate.userData===null) next({name:'Login'});
    else next()
}

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        beforeEnter: authGuard
    },
    {
        path: '/create',
        name: 'CreateOneTask',
        component: CreateOneTask,
        beforeEnter: authGuard,
    },
    {
        path: '/run',
        name: 'RunDetection',
        component: RunDetection,
        beforeEnter: authGuard,
    },
    {
        path: '/tasks/:param',
        name: 'TaskList',
        component: TaskList,
        beforeEnter: authGuard,
    },
    {
        path: '/task/:id',
        name: 'OneTaskView',
        component: OneTaskView,
        beforeEnter: authGuard,
    },
    {
        path: '/DetectResult',
        name: 'DetectResult',
        component: DetectResult,
        beforeEnter: authGuard,
    },
    {
        path: '/DetectResultList/:id',
        name: 'DetectResultList',
        component: DetectResultList,
        beforeEnter: authGuard,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
});

export default router;