import { createRouter, createWebHistory } from "vue-router";


const routes = [
   {
      path: '/',
      redirect: 'login',
   },
   {
      path: '/login',
      name: 'Login',
      component: () => import('@@/page/login/Login.vue')
   },
   {
      path: "/home",
      component: () => import('@@/page/home/Home.vue'),
      redirect: '/welcome',
      children: [
         { path: '/welcome', component: () => import('@@/page/welcome/Welcome.vue') },
         { path: '/user', component: () => import('@@/page/user/User.vue') },
      ]
   }
];

const router = createRouter({
   history: createWebHistory(),
   routes
});


export default router;
