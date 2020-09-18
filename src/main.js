// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import firebase from "firebase/app";
import 'firebase/app';
import "firebase/firestore";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(fas);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.config.productionTip = false;

const firebaseConfig = {
  /*apiKey: "AIzaSyD827jJpA2nw6-dHpyjNUe2KmwcEiObLZY",
  authDomain: "hontomo-41f21.firebaseapp.com",
  databaseURL: "https://hontomo-41f21.firebaseio.com",
  projectId: "hontomo-41f21",
  storageBucket: "hontomo-41f21.appspot.com",
  messagingSenderId: "222453016377",
  appId: "1:222453016377:web:f44ad6a759e9a841802ae8",
  measurementId: "G-HLRMXWBK8E"*/
  apiKey: "AIzaSyCH35C3onjeiH90THLgq8o0hsVqF-i2uGU",
  authDomain: "hontomo-next.firebaseapp.com",
  databaseURL: "https://hontomo-next.firebaseio.com",
  projectId: "hontomo-next",
  storageBucket: "hontomo-next.appspot.com",
  messagingSenderId: "438471711062",
  appId: "1:438471711062:web:f4bbf933f6e22f2afcdef7",
  measurementId: "G-JBC9Q2JSS1"
};
firebase.initializeApp(firebaseConfig);

import firebaseUtils from "./utils/firebaseUtils";
import { ModalPlugin } from "bootstrap-vue";
Vue.use(ModalPlugin);
Vue.mixin(firebaseUtils);
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: {
    App
  },
  template: "<App/>"
});
