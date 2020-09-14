<template>
  <div>
    <p>動作確認用ページ</p>
    <CreateList />
    <div>{{lists[0].name}}</div>
  </div>
</template>

<script>
import CreateList from "./shared/CreateList.vue";

export default {
  components: {
    CreateList,
  },

  data() {
    return {
      lists: {},
    };
  },

  created() {
    this.lists = this.getOwnedListsFromUserId("4oFo1QKy3X8wGwuGx98h");
    console.debug("fuga:",this.lists);
  },
};
</script>

<style>
</style>