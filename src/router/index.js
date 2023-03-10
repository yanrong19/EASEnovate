import { createRouter, createWebHistory } from "vue-router";
import Start from "../Views/Start.vue";
import Home from "../Views/Home.vue";
import Landing from "../Views/Landing.vue";
import CustomerProfile from "../Views/CustomerProfile.vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const routes = [
  {
    path: "/",
    name: "Landing",
    component: Landing,
  },
  {
    path: "/login",
    name: "Start",
    component: Start,
  },
  {
    path: "/home",
    name: "home",
    component: Home,
    meta: {
      requiresAuth: true, // Indicates that this route requires authentication
    },
  },
  {
    path: "/profile",
    name: "profile",
    component: CustomerProfile,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router to take note for protection
// router.beforeEach((to, from, next) => {
//   const auth = getAuth();
//   const currentUser = auth.currentUser;
//   console.log(currentUser);
//   console.log(to.matched.some((record) => record.meta.auth));
//   console.log("htes");
//   if (
//     to.matched.some((record) => record.meta.auth) &&
//     (!currentUser || currentUser === null)
//   ) {
//     next("/login");
//     console.log("here");
//   } else {
//     next(); // Very important to call next() in this case!
//   }
// });

export default router;
