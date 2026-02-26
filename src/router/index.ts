import { createRouter, createWebHistory, type Router } from "vue-router";
import HomeView from "../views/HomeView.vue";
import MxNChessboard from "@/components/MxNChessboard.vue";

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView
    },
    {
      path: "/testing/mxn",
      name: "mxn-chessboard",
      component: MxNChessboard
    }
  ]
});

export default router;
