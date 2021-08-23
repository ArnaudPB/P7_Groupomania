import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Signup from '../components/Signup.vue';
import Login from '../components/Login.vue';
import Feed from '../views/Feed.vue';
import HotFeed from '../views/HotFeed.vue';
import NewPost from '../components/NewPost.vue';
import Account from '../components/Account.vue';
import SinglePost from '../components/SinglePost.vue';
import Accounts from '../components/Accounts.vue';



Vue.use(VueRouter);

const routes = [{
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/signup',
        name: 'signup',
        component: Signup,
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/account/:id',
        name: 'account',
        component: Account,
    },
    {
        path: '/posts',
        name: 'feed',
        component: Feed,
    },
    {
        path: '/hot',
        name: 'hotFeed',
        component: HotFeed,
    },
    {
        path: '/posts/:id',
        name: 'singlePost',
        component: SinglePost,

    },
    {
        path: '/accounts',
        name: 'accounts',
        component: Accounts,

    },

    {
        path: '/add',
        name: 'NewPost',
        component: NewPost,
    },

    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue'),
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;