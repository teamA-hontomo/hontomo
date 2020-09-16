<template>
  <div class="row">
    <div class="col-8">
      <h1>動作確認用ページ</h1>新規リスト作成
      <CreateList />
      <hr />
      <button @click="openAgora" class="btn btn-primary">アゴラを開く</button>
      <!-- <div>
        <p>所有しているリスト一覧</p>
        <ul>
          <li v-for="list in ownedLists" :key="list.id">
            リスト名:{{ list.name }},制作日:{{
            list.created.toDate()
            }},公開かどうか{{ list.open }},オーナー:{{
            list.owenerId
            }},いいね数:{{ list.rating }}
          </li>
        </ul>
      </div>
      <hr />
      <div>
        <p>登録しているリスト一覧</p>
        <ul>
          <li v-for="list in subscribedLists" :key="list.id">
            リスト名:{{ list.name }},制作日:{{
            list.created.toDate()
            }},公開かどうか{{ list.open }},オーナー:{{
            list.owenerId
            }},いいね数:{{ list.rating }}
          </li>
        </ul>
      </div>
      <hr />
      <div>
        <p>リスト名変更</p>
        <span>「{{ ownedLists[0].name }}」の名前を変更します</span>
        <input v-model="newName" />
        <button @click="changeListName()" type="button">名前を変更</button>
      </div>
      <hr />
      <div>
        <p>コマをリストに追加</p>
        <img :src="imagePath" />
        <span>このコマを「{{ ownedLists[0].name }}」に</span>
        <button @click="addFrameToList()" type="button">追加</button>
      </div>
      <hr />
      <div>
        <span>「{{ ownedLists[0].name }}」に登録されているコマ一覧</span>
        <div v-for="image in imagesArray" :key="image.id">
          <img :src="image.path" />
          {{image.title}}
        </div>
      </div>-->
    </div>
    <div class="col-4" v-show="showAgora">
      <AgoraMain @fromAgora="closeAgora"></AgoraMain>
    </div>
  </div>
</template>

<script>
import CreateList from "./shared/CreateList.vue";
import AgoraMain from "./shared/AgoraMain.vue";

export default {
  components: {
    CreateList,
    AgoraMain,
  },

  data() {
    return {
      ownedLists: [],
      subscribedLists: [],
      newName: "",
      userId: "4oFo1QKy3X8wGwuGx98h",
      listId: "3XAbHkY5hnkk8YLNyMXp",
      imageName: "frames/ブラックジャックによろしく1.jpg",
      imagePath: "",
      showAgora: false,
    };
  },

  created() {
    this.imagePath = require("../assets/" + this.imageName);
    this.ownedLists = this.getOwnedListsFromUserId(this.userId);
    this.subscribedLists = this.getSubscribedListsFromUserId(this.userId);
  },

  computed: {
    imagesArray() {
      return this.getFramesFromList(this.ownedLists[0].id);
    },
  },

  methods: {
    changeListName() {
      this.renameList(this.ownedLists[0].id, this.newName);
      alert("リスト名を変更しました");
      this.$router.push("Top");
    },

    addFrameToList() {
      this.setFrameToList(this.ownedLists[0].id, this.imageName);
      alert("画像をリストに追加しました。");
      this.$router.push("Top");
    },

    closeAgora() {
      this.showAgora = false;
    },

    openAgora(){
      this.showAgora = true;
    },
  },
};
</script>

<style></style>
