import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  routes: [{
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/drainage',
      name: 'drainage',
      component: () => import('./views/Drainage.vue'),
    },
    {
      path:'/Axios_mock',
      name:'Axios_mock',
      component: () => import('./views/Axios_mock.vue')
    },
    {
      path:'/FatherComponent',
      name:'FatherComponent',
      component: () => import('./views/Fathercomponent.vue')
    }
  ],
});
