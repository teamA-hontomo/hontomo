<template>
  <button @click="makeList()">リストを新規作成</button>
</template>

<script>
import firebase from "firebase";

export default {
  name: "CreateList",

  methods: {
    makeList() {
      var listData = {
        name: "新しいリスト",
        open: false,
        ownerId: "4oFo1QKy3X8wGwuGx98h",
        rating: 0,
      };
      this.createList(listData);
    },
  },
};
</script>

<style>
</style>