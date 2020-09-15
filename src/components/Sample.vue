<template>
  <div>
    <p>動作確認用ページ</p>
    <CreateList />
    <div>
      <p>所有しているリスト一覧</p>
      <ul>
        <li
          v-for="list in ownedLists"
          :key="list.name"
        >リスト名:{{list.name}},制作日:{{list.created.toDate()}},公開かどうか{{list.open}},オーナー:{{owenerId}},いいね数:{{rating}}</li>
      </ul>
    </div>
    <div>
      <p>登録しているリスト一覧</p>
      <ul>
        <li
          v-for="list in subscribedLists"
          :key="list.name"
        >リスト名:{{list.name}},制作日:{{list.created.toDate()}},公開かどうか{{list.open}},オーナー:{{owenerId}},いいね数:{{rating}}</li>
      </ul>
    </div>
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
      ownedLists: {},
      subscribedLists: [],
      userId: "4oFo1QKy3X8wGwuGx98h",
    };
  },

  created() {
    this.ownedLists = this.getOwnedListsFromUserId(this.userId);
    this.subscribedLists = this.getSubscribedListsFromUserId(this.userId);
    console.debug(this.subscribedLists);
  },
};
</script>

<style>
</style>