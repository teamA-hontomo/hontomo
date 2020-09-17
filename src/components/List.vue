<template>
  <div id='list'>
    <TitleBox>
      <span class='mx-auto my-auto' style="font-size:24px;">{{ list.name }}</span>
      <div class='my-auto mr-2'>
        <div v-if='ownerId != userId'>
          <span v-if='!followed'>フォローする</span>
          <span v-else>フォローしています</span>
          <font-awesome-icon
            icon='heart'
            class='fa-lg'
            v-on:click='onClickHeart'
            v-bind:class='heartColor'
          />
        </div>
        <span>フォロワー : {{ rating }}</span>
      </div>
      <div v-if='ownerId == userId'>
        <button v-on:click='openModal' v-if='isopen' class='btn btn-success'>公開</button>
        <button v-on:click='openModal' v-if='!isopen' class='btn btn-danger'>非公開</button>
      </div>
    </TitleBox>

    <ContentsBox>
      <div v-if="frames.length" class="y-frame">
        <div v-for='frame in frames' class='col-md-3' :key='frame.id'>
          <div class='card'>
            <img :src='"/static/" + frame.path' class='card-img-top' v-on:click='openFrame' />
            <div class='card-body'>
              <p class='card-title'>{{frame.title}}</p>
              <p class='card-title'>
                {{frame.volume}}巻
                /{{frame.page}}ページ
              </p>
            </div>
          </div>
        </div>
      </div>
      <div v-else>コマはまだありません。</div>
    </ContentsBox>
    <ModalWindow v-show='showModal' v-on:fromModal='closeModal' :width='"20"' :height='"50"'>
      <div class='mt-5 mx-auto'>
        <h5 class='mx-auto font-weight-bold'>ただいまの設定は[{{ openStatus }}]です</h5>
        <h5 class='mx-auto font-weight-bold'>変更してもよろしいですか？</h5>
        <button v-show='isopen' v-on:click='changeOpen' class='btn btn-danger mx-auto mt-5'>非公開にする</button>
        <button v-show='!isopen' v-on:click='changeOpen' class='btn btn-success mx-auto mt-5'>公開する</button>
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
      isopen: false,
      name: "",

      rating: 0,
      followed: false,
      showModal: false,
      openingImg: "",
      showFrame: false,
      list: {},
      frames: [],
      ownerId: "",
      db: "",
    };
  },

  async created() {
    this.id = this.$route.params.id;
    this.db = firebase.firestore();
    this.getListFromListId(this.id).then((returnedlist) => {
      this.list = returnedlist;
      this.isopen = this.list.open;
      this.rating = this.list.rating;
      this.ownerId = this.list.ownerId;
    });
    //コマの情報取得
    this.frames = this.getFramesFromList(this.id);
    let self = this;
    await this.db //TODO: utils
      .collection("users")
      .doc(this.userId)
      .get()
      .then((user) => {
        self.followed = user.data().lists.includes(self.listId) ? true : false;
      });
  },

  computed: {
    openStatus: function () {
      if (this.isopen) {
        return "公開";
      } else {
        return "非公開";
      }
    },
    heartColor: function () {
      if (this.followed) {
        return { clickedHeart: true };
      } else {
        return { clickedHeart: false };
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
      if (this.isopen) {
        this.db.collection("lists").doc(this.listId).update({
          open: false,
        });
        this.isopen = false;
      } else {
        this.db.collection("lists").doc(this.listId).update({
          open: true,
        });
        this.isopen = true;
      }
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
    onClickHeart: function () {
      if (this.followed) {
        this.followed = false;
        this.rating--;
        this.removeStarFromList(this.listId, this.userId);
      } else {
        this.followed = true;
        this.rating++;
        this.addStarToList(this.listId, this.userId);
      }
    },
  },

  watch: {
    $route: function (val, oldVal) {
      this.listId = val.params.id;
      this.getListFromListId(this.listId).then((returnedlist) => {
        this.list = returnedlist;
        this.isopen = this.list.open;
        this.rating = this.list.rating;
        this.ownerId = this.list.ownerId;
      });
      this.frames = this.getFramesFromList(this.listId);
      const self = this;
      this.db
        .collection("users")
        .doc(self.userId)
        .get()
        .then((user) => {
          self.followed = user.data().lists.includes(self.listId)
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
.clickedHeart {
  color: pink;
}
.y-frame {
  width: 100%;
  display: flex;
}
</style>
