import { createRouter, createWebHistory } from "vue-router";
import Start from "../Views/Start.vue";
import Home from "../Views/Home.vue";
import Landing from "../Views/Landing.vue";
import EditProfile from "../Views/EditProfile.vue";
import DisplayProfile from "../Views/DisplayProfile.vue";
import JobRequest from "../Views/JobRequest.vue";
import LeaveReview from "../Views/LeaveReview.vue";
import DisplayID from "../Views/DisplayID.vue";
import DisplayID2 from "../Views/DisplayID2.vue";

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
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true, // Indicates that this route requires authentication
    },
  },
  {
    path: "/displayid/:profile",
    name: "DisplayIDView",
    component: DisplayID,
    props: true,
  },
  {
    path: "/displayid/",
    name: "DisplayID2",
    component: DisplayID2,
  },
  {
    path: "/profile",
    name: "DisplayProfile",
    component: DisplayProfile,
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/profile/edit",
    name: "Edit",
    component: EditProfile,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/jobrequest",
    name: "jobrequest",
    component: JobRequest,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/review/:requestID",
    name: "LeaveReview",
    component: LeaveReview,
    meta: {
      requiresAuth: true,
    },
    props: true,
  },

  {
    path: "/review",
    name: "Review",
    component: LeaveReview,
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

/*
  {
    path: "/displayid",
    name: "DisplayID",
    component: DisplayID,
  },
  {
    path: "/editid",
    name: "EditID",
    component: EditID,
  },
  {
    path: "/profile",
    name: "Profile",
    component: CustomerProfile,
    meta: {
      requiresAuth: true,
    },
  },
  
  {
    path: "/profile/jobrequest",
    name: "jobrequest",
    component: JobRequest,
    meta: {
      requiresAuth: true,
    },
  },*/

/*
  {
    path: "/displayid",
    name: "DisplayID",
    component: DisplayID,
  },
  {
    path: "/editid",
    name: "EditID",
    component: EditID,
  },
  
  {
    path: "/profile",
    name: "Profile",
    component: CustomerProfile,
    meta: {
      requiresAuth: true,
    },
  },*/
export default router;
