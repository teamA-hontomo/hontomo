import Vue from "vue";
import Router from "vue-router";
import Top from "../components/Top.vue";
import Shelf from "../components/Shelf";
import List from "../components/List";
import MyLists from "../components/MyLists";
import GlobalLists from "../components/GlobalLists";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Top",
      component: Top
    },
    {
      path: "/shelf",
      name: "Shelf",
      component: Shelf
    },
    {
      path: "/list/:id",
      name: "List",
      component: List
    },
    {
      path: "/my-lists",
      name: "MyLists",
      component: MyLists
    },
    {
      path: "/global-lists",
      name: "GlobalLists",
      component: GlobalLists
    }
  ]
});
