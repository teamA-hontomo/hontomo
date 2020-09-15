import Vue from "vue";
import Router from "vue-router";
import Top from "../components/Top.vue";
import Shelf from "../components/Shelf";
import List from "../components/List";
import MyLists from "../components/MyLists";
import GlobalLists from "../components/GlobalLists";
import View from "../components/View";
import Sample from "../components/Sample";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Top",
      component: Top
    },
    {
      path: "/view",
      name: "View",
      component: View
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
    },
    {
      path: "/sample",
      name: "Sample",
      component: Sample
    }
  ]
});
