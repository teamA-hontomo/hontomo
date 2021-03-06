import Vue from "vue";
import Router from "vue-router";
import Top from "../components/Top.vue";
import Shelf from "../components/Shelf";
import List from "../components/List";
import MyLists from "../components/MyLists";
import GlobalLists from "../components/GlobalLists";
import View from "../components/View";
import Author from "../components/Author";
import AuthorIndex from "../components/AuthorIndex";
import Sample from "../components/Sample";
import Interview from "../components/Interview"


Vue.use(Router);

export default new Router({
  routes: [{
      path: "/",
      name: "Top",
      component: Top
    },
    {
      path: "/view/:xml_src",
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
    },

    {
      path: "/authors/:id",
      name: "Author",
      component: Author
    }, {
      path: "/authors",
      name: "AuthorIndex",
      component: AuthorIndex
    },
    {
      path: "/authors/:id/interview/:interview_id",
      name: "Interview",
      component: Interview
    }
  ]
});
