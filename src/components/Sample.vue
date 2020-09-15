<template>
  <div>
    <p>動作確認用ページ</p>
    <CreateList />
    <div>
      <p>所有しているリスト一覧</p>
      <ul>
        <li
          v-for="list in ownedLists"
          :key="list.created.toDate()"
        >リスト名:{{list.name}},制作日:{{list.created.toDate()}},公開かどうか{{list.open}},オーナー:{{list.owenerId}},いいね数:{{list.rating}}</li>
      </ul>
    </div>
    <div>
      <p>登録しているリスト一覧</p>
      <ul>
        <li
          v-for="list in subscribedLists"
          :key="list.created.toDate()"
        >リスト名:{{list.name}},制作日:{{list.created.toDate()}},公開かどうか{{list.open}},オーナー:{{list.owenerId}},いいね数:{{list.rating}}</li>
      </ul>
    </div>
    <div>
      <p>リスト名変更</p>
      <input v-model="newName" />
      <button @click="changeListName()" type="button">名前を変更</button>
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
      ownedLists: [],
      subscribedLists: [],
      newName: "",
      userId: "4oFo1QKy3X8wGwuGx98h",
      listId: "3XAbHkY5hnkk8YLNyMXp",
    };
  },

  created() {
    this.ownedLists = this.getOwnedListsFromUserId(this.userId);
    this.subscribedLists = this.getSubscribedListsFromUserId(this.userId);
    console.debug(this.subscribedLists);
  },

  methods: {
    changeListName() {
      this.renameList(this.listId, this.newName);
      alert("リスト名を変更しました");
      router.push("Top");
    },
  },
};
</script>

<style>
</style>