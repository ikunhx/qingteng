import Vue from 'vue';
import VueRouter from "vue-router";

import Examine from '@/pages/Examine.vue';
import Introduction from '@/pages/Introduction.vue';
import User from '@/pages/User.vue';
import UserExamine from '@/pages/UserExamine.vue';
import showUser from '@/pages/showUser.vue';
import showAdministrator from '@/pages/showAdministrator.vue';
import showSuperAdministrator from '@/pages/showSuperAdministrator.vue';
Vue.use(VueRouter);
const router = new VueRouter({
    routes: [
        {
            path: '/',
            component: Introduction,
        },
        {
            path: '/Introduction',
            component: Introduction,
            name: 'Introduction'
        },
        {
            path: '/Examine',
            component: Examine,
            name: 'Examine'
        },
        {
            path: '/UserExamine',
            component: UserExamine,
            name: 'UserExamine'
        },
        {
            path: '/MyResource',
            name: 'MyResource',
            component: () => import('../pages/MyResource.vue')
        },
        {
            path: '/UserResource',
            name: 'UserResource',
            component: () => import('../pages/UserResource.vue')
        },
        {
            path: '/User',
            component: User,
            name: 'User'
        },
        {
            path: '/showUser',
            component: showUser,
            name: 'showUser'
        },
        {
            path: '/showAdministrator',
            component: showAdministrator,
            name: 'showAdministrator'
        },
        {
            path: '/showSuperAdministrator',
            component: showSuperAdministrator,
            name: 'showSuperAdministrator'
        }

    ]
})



export default router;