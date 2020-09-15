<template>
  <div>
    <h1>動作確認用ページ</h1>新規リスト作成
    <CreateList />
    <hr />

    <div>
      <p>所有しているリスト一覧</p>
      <ul>
        <li
          v-for="list in ownedLists"
          :key="list.id"
        >リスト名:{{list.name}},制作日:{{list.created.toDate()}},公開かどうか{{list.open}},オーナー:{{list.owenerId}},いいね数:{{list.rating}}</li>
      </ul>
    </div>
    <hr />
    <div>
      <p>登録しているリスト一覧</p>
      <ul>
        <li
          v-for="list in subscribedLists"
          :key="list.id"
        >リスト名:{{list.name}},制作日:{{list.created.toDate()}},公開かどうか{{list.open}},オーナー:{{list.owenerId}},いいね数:{{list.rating}}</li>
      </ul>
    </div>
    <hr />
    <div>
      <p>リスト名変更</p>
      <span>「{{ownedLists[0].name}}」の名前を変更します</span>
      <input v-model="newName" />
      <button @click="changeListName()" type="button">名前を変更</button>
    </div>
    <hr />
    <div>
      <p>コマをリストに追加</p>
      <img :src="imagePath" />
      <span>このコマを「{{ownedLists[0].name}}」に</span>
      <button @click="addFrameToList()" type="button">追加</button>
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
      imagePath: require("../assets/frames/ブラックジャックによろしく1.jpg"),
    };
  },

  created() {
    this.ownedLists = this.getOwnedListsFromUserId(this.userId);
    this.subscribedLists = this.getSubscribedListsFromUserId(this.userId);
    console.debug(this.subscribedLists);
  },

  methods: {
    changeListName() {
      this.renameList(this.ownedLists[0].id, this.newName);
      alert("リスト名を変更しました");
      this.$router.push("Top");
    },

    addFrameToList() {
      this.setFrameToList(this.ownedLists[0].id, this.imagePath);
      alert("画像をリストに追加しました。");
      this.$router.push("Sample");
    },
  },
};
</script>

<style>
</style>