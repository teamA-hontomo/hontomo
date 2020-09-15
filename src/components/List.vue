<template>
  <div id="list">
    <TitleBox>
      <span class="mx-auto my-auto">{{ list_info.name }}</span>
      <div slot="button">
        <font-awesome-icon
          icon="star"
          class="fa-lg"
          v-on:click="onClickStar"
          v-bind:class="starColor"
        />
        <span>{{ list_info.rating }}</span>
        <button v-on:click="openModal" v-if="list_info.open" class="btn btn-success">
          公開
        </button>
        <button v-on:click="openModal" v-if="!list_info.open" class="btn btn-danger">
          非公開
        </button>
      </div>
    </TitleBox>

    <ContentsBox>
      <div v-for="id in Object.keys(cartoonFrames)" class="col-md-3" :key="id">
        <div class="card">
          <img
            :src="require('../' + cartoonFrames[id]['path'])"
            class="card-img-top"
            v-on:click="openFrame"
          />
          <div class="card-body">
            <p class="card-title">{{ cartoonFrames[id]["title"] }}</p>
            <p class="card-title">
              {{ cartoonFrames[id]["volume"] }}巻 /{{
                cartoonFrames[id]["page"]
              }}ページ<br />
              追加日:{{ date }}
              debug:{{frames.data}}
            </p>
          </div>
        </div>
      </div>
    </ContentsBox>
    <ModalWindow
      v-show="showModal"
      v-on:fromModal="closeModal"
      :width="'20'"
      :height="'50'"
    >
      <div class="mt-5 mx-auto">
        <h5 class="mx-auto font-weight-bold">
          ただいまの設定は[{{ openStatus }}]です
        </h5>
        <h5 class="mx-auto font-weight-bold">変更してもよろしいですか？</h5>
        <button
          v-show="list_info.open"
          v-on:click="changeOpen"
          class="btn btn-danger mx-auto mt-5"
        >
          非公開にする
        </button>
        <button
          v-show="!list_info.open"
          v-on:click="changeOpen"
          class="btn btn-success mx-auto mt-5"
        >
          公開する
        </button>
      </div>
    </ModalWindow>

    <ModalWindow
      v-show="showFrame"
      v-on:fromModal="closeFrame"
      :width="'50'"
      :height="'50'"
    >
      <img :src="openingImg" class="card-img-top" v-on:click="openFrame" />
    </ModalWindow>
  </div>
</template>
<script>
import TitleBox from "./shared/TitleBox.vue";
import ContentsBox from "./shared/ContentsBox.vue";
import ModalWindow from "./shared/ModalWindow.vue";
import firebase from "firebase";
import "firebase/firestore";
export default {
  data: function() {
    return {
      db: null,
      id: this.$route.params.id,
      followed: false,
      showModal: false,
      openingImg: "",
      date: "",
      showFrame: false,
      //listId: "EjF12B6bV3sIfqip9yQH",
      //listId2: "jTCoI4Do2gB4fnXE4b2B",
      Id: ["EjF12B6bV3sIfqip9yQH", "jTCoI4Do2gB4fnXE4b2B"],
      owenerId: "",
      frames: {},
      list_info:{},
      cartoonFrames: {
        1: {
          page: "1",
          title: "ブラックジャックによろしく",
          path: "assets/frames/ブラックジャックによろしく1.jpg",
          volume: "1"
        },
        2: {
          page: "1",
          title: "ブラックジャックによろしく",
          path: "assets/frames/ブラックジャックによろしく2.jpg",
          volume: "2"
        }
      }
    };
  },
  created() {
    this.db = firebase.firestore();
    //リストの情報取得
    this.getListFromListId(this.Id[this.id - 1]).then(returnedlist => {
      //console.log(returnedlist);
      this.list_info = returnedlist;
      this.date = returnedlist.created.toDate();
    });

    //コマの情報取得
    this.frames = this.getFramesFromList("EjF12B6bV3sIfqip9yQH");
    console.log(`debugだよ${this.getFramesFromList("EjF12B6bV3sIfqip9yQH")}`);
  },
  computed: {
    starColor: function() {
      if (this.followed) {
        return { yellowStar: true };
      } else {
        return { yellowStar: false };
      }
    },
    openStatus: function() {
      if (this.list_info.open) {
        return "公開";
      } else {
        return "非公開";
      }
    }
  },
  components: {
    TitleBox,
    ContentsBox,
    ModalWindow
  },
  methods: {
    openModal: function() {
      this.showModal = true;
    },
    onClick: function() {
      this.list_info.open = !this.list_info.open;
    },
    onClickStar: function() {
      if (this.followed) {
        this.followed = false;
        //this.rating--;
        this.list_info.rating--;
      } else {
        this.followed = true;
        //this.rating++;
        this.list_info.rating++;
      }
      //firebase側の更新
      const userRef = this.db
        .collection("lists")
        .doc(this.Id[this.id - 1])
        .update({
          //rating: this.rating
          rating: this.list_info.rating
        });
    },
    closeModal: function() {
      this.showModal = false;
    },

    //公開非公開の変更
    changeOpen: function() {
      this.list_info.open = !this.list_info.open;

      //firebase側処理
      if (this.list_info.open) {
        const userRef = this.db
          .collection("lists")
          .doc(this.Id[this.id - 1])
          .update({
            open: true
          });
      } else {
        const userRef = this.db
          .collection("lists")
          .doc(this.Id[this.id - 1])
          .update({
            open: false
          });
      }
      this.closeModal();
    },
    openFrame: function(event) {
      this.openingImg = event.target.src;
      this.showFrame = true;
      var returnLists = [];
    },
    closeFrame: function() {
      this.showFrame = false;
    }
  },
  watch: {
    $route: function(val, oldVal) {
      this.id = val.params.id;

      this.getListFromListId(this.Id[this.id - 1]).then(returnedlist => {
        //console.log(returnedlist);
        this.list_info = returnedlist;
        this.date = returnedlist.created.toDate();
      });
    }
  }
};
</script>
<style scoped>
.card {
  background-color: #3e3e3e;
}
.card-text {
  color: #eeeeee;
}
.yellowStar {
  color: yellow;
}
</style>
