<template>
  <div>
    <p>動作確認用ページ</p>
    <CreateList />
    <ul>
      <li
        v-for="list in lists"
        :key="list.name"
      >リスト名:{{list.name}},制作日:{{list.created.toDate()}},公開かどうか{{list.open}},オーナー:{{owenerId}},いいね数:{{rating}}</li>
    </ul>
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
      userId: "4oFo1QKy3X8wGwuGx98h",
    };
  },

  created() {
    this.lists = this.getOwnedListsFromUserId(this.userId);
    console.debug("fuga:", this.lists);
  },
};
</script>

<style>
</style>