import { RouteRecordRaw } from "vue-router";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "main",
    // redirect: { name: "home" },
    component: () => {
      return import(`@/App.vue`);
    },
    // children: [
    //   {
    //     path: "/:hashId?",
    //     name: "home",
    //     component: () => {
    //       return import(`../App.vue`);
    //     },
    //   },
    // ],
  },

  //   {
  //     path: "/:pathMatch(.*)*",
  //     name: "not-found",
  //     component: () => {
  //       return import(`@/pages/PageNotFound.vue`);
  //     },
  //   },
];
