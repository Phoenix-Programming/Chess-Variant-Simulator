import { createRouter, createWebHistory, type Router } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView // HomeView has been removed and should be replaced later
    } /*,
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }*/
  ]
});

export default router;
