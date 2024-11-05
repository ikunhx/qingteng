import Vue from 'vue';
import VueRouter from "vue-router";
import Examine from '@/pages/Examine.vue';
import Introduction from '@/pages/Introduction.vue';
import Resources from '@/pages/Resources.vue';
import User from '@/pages/User.vue';
import UserExamine from '@/pages/UserExamine.vue';
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
            path: '/Resources',
            component: Resources,
            name: 'Resources'
        },
        {
            path: '/User',
            component: User,
            name: 'User'
        },


    ]
})




export default router;