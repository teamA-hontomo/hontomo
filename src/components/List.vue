<template>
  <div id='list'>
    <TitleBox>
      <span class="mx-auto my-auto">{{ list.name }}</span>
      <StarButton :list="list" :userId="userId" />
      <button v-on:click="openModal" v-if="open" class="btn btn-success">公開</button>
      <button v-on:click="openModal" v-if="!open" class="btn btn-danger">非公開</button>
    </TitleBox>

    <ContentsBox>
      <div v-for="frame in frames" class="col-md-3" :key="frame.id">
        <div class="card">
          <img :src="require('../' + frame.path)" class="card-img-top" v-on:click="openFrame" />
          <div class="card-body">
            <p class="card-title">{{frame.title}}</p>
            <p class="card-title">
              {{frame.volume}}巻
              /{{frame.page}}ページ
            </p>
          </div>
        </div>
      </div>
    </ContentsBox>
    <ModalWindow v-show='showModal' v-on:fromModal='closeModal' :width='"20"' :height='"50"'>
      <div class='mt-5 mx-auto'>
        <h5 class='mx-auto font-weight-bold'>ただいまの設定は[{{ openStatus }}]です</h5>
        <h5 class='mx-auto font-weight-bold'>変更してもよろしいですか？</h5>
        <button v-show='open' v-on:click='changeOpen' class='btn btn-danger mx-auto mt-5'>非公開にする</button>
        <button v-show='!open' v-on:click='changeOpen' class='btn btn-success mx-auto mt-5'>公開する</button>
      </div>
    </ModalWindow>

    <ModalWindow v-show='showFrame' v-on:fromModal='closeFrame' :width='"50"' :height='"50"'>
      <img :src='openingImg' class='card-img-top' v-on:click='openFrame' />
    </ModalWindow>
  </div>
</template>

<script>
import TitleBox from "./shared/TitleBox.vue";
import ContentsBox from "./shared/ContentsBox.vue";
import ModalWindow from "./shared/ModalWindow.vue";
import StarButton from "./shared/StarButton.vue";
import firebase from "firebase";
import "firebase/firestore";

export default {
  data: function () {
    return {
      userId: "4oFo1QKy3X8wGwuGx98h", //TODO:ハードコーディング
      listId: this.$route.params.id,
      listInfo: {},
      open: true,
      rating: 5,
      name: "",
      followed: false,
      showModal: false,
      openingImg: "",
      showFrame: false,
      list: {},
      frames: [],
      owenerId: "",
      db: "",
    };
  },

  created() {
    this.id = this.$route.params.id;
    this.db = firebase.firestore();
    this.getListFromListId(this.id).then((returnedlist) => {
      this.list = returnedlist;
    });
    //コマの情報取得
    this.frames = this.getFramesFromList(this.id);
    this.db //TODO: utils
      .collection("users")
      .doc(this.userId)
      .get()
      .then((user) => {
        this.followed = user.data().lists.includes(self.listId) ? true : false;
      });
  },

  computed: {
    starColor: function () {
      if (this.followed) {
        return { yellowStar: true };
      } else {
        return { yellowStar: false };
      }
    },

    openStatus: function () {
      if (this.open) {
        return "公開";
      } else {
        return "非公開";
      }
    },
  },

  components: {
    TitleBox,
    ModalWindow,
    StarButton,
    ContentsBox,
  },

  methods: {
    openModal: function () {
      this.showModal = true;
    },

    onClick: function () {
      this.open = !this.open;
    },

    closeModal: function () {
      this.showModal = false;
    },

    //公開非公開の変更
    changeOpen: function () {
      if (this.open) {
        this.db.collection("lists").doc(this.listId).update({
          open: false,
        });
      } else {
        this.db.collection("lists").doc(this.listId).update({
          open: true,
        });
      }
      this.setListInfo();
      this.closeModal();
    },

    openFrame: function (event) {
      this.openingImg = event.target.src;
      this.showFrame = true;
      var returnLists = [];
    },

    closeFrame: function () {
      this.showFrame = false;
    },

    setListInfo: function () {
      //すでにお気に入り登録済みかどうか
      this.db
        .collection("users")
        .doc(this.userId)
        .get()
        .then((user) => {
          self.followed = user.data().lists.includes(self.listId)
            ? true
            : false;
        });
    },
  },

  watch: {
    $route: function (val, oldVal) {
      this.id = val.params.id;
      console.debug(this.id);
      this.getListFromListId(this.id).then((returnedlist) => {
        this.list = returnedlist;
      });
      this.frames = this.getFramesFromList(this.id);
      this.db
        .collection("users")
        .doc(this.userId)
        .get()
        .then((user) => {
          this.followed = user.data().lists.includes(self.listId)
            ? true
            : false;
        });
    },
  },
};
</script>

<style scoped>
.card {
  background-color: #3e3e3e;
}
.card-text {
  color: #eeeeee;
}
</style>
