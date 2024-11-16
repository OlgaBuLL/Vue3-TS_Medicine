import { createRouter, createWebHistory } from "vue-router";
import PhysiciansView from "@/views/PhysiciansView.vue";
import EmployeeView from "@/views/EmployeeView.vue";
import NotFound from "@/views/NotFound.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "physicians",
      component: PhysiciansView,
    },
    {
      path: "/employee/:id",
      name: "employee",
      component: EmployeeView,
    },
    {
      path: "/nurses",
      name: "nurses",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/views/NursesView.vue"),
    },
    {
      path: "/:catchAll(.*)",
      name: "NotFound",
      component: NotFound,
    },
  ],
});

export default router;
