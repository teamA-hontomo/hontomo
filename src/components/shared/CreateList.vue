<template>
  <button @click="createList()">リストを新規作成</button>
</template>

<script>
import firebase from "firebase";
import "firebase/firestore";

export default {
  name:"CreateList",

  data() {
    return {
      listName: "sampleList",
      db:null
    };
  },

  created(){
    this.db=firebase.firestore()
  },

  methods: {
    createList() {
      this.db.collection("lists")
        .add({
          name: this.listName,
        })
        .then(() => {
          alert(this.listName + "を新規作成しました。");
        })
        .catch(() => {
          alert(this.listName + "を作成するときにエラーが発生しました。");
        });
    },
  },


};
</script>

<style>
</style>