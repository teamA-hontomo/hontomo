<template>
  <div id='list'>
    <TitleBox>
      <span class='mx-auto my-auto'>{{ id }}</span>
      <div slot='button'>
        <font-awesome-icon
          icon='star'
          class='fa-lg'
          v-on:click='onClickStar'
          v-bind:class='starColor'
        />
        <span>{{ rating }}</span>
        <button v-on:click='openModal' v-if='open' class='btn btn-success'>公開</button>
        <button v-on:click='openModal' v-if='!open' class='btn btn-danger'>非公開</button>
      </div>
    </TitleBox>

    <ContentsBox>
      <div v-for='id in Object.keys(cartoonFrames)' class='col-md-3' :key='id'>
        <div class='card'>
          <img
            :src='require("../" + cartoonFrames[id]["url"])'
            class='card-img-top'
            v-on:click='openFrame'
          />
          <div class='card-body'>
            <p class='card-title'>{{cartoonFrames[id]["title"]}}</p>
            <p class='card-title'>
              {{cartoonFrames[id]["volume"]}}巻
              /{{cartoonFrames[id]["page"]}}ページ
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
export default {
  data: function () {
    return {
      id: this.$route.params.id,
      open: true,
      rating: 5,
      name: "リストサンプルタイトル",
      followed: false,
      showModal: false,
      openingImg: "",
      showFrame: false,
      cartoonFrames: {
        1: {
          page: "1",
          title: "ブラックジャックによろしく",
          url: "assets/frames/ブラックジャックによろしく1.jpg",
          volume: "1",
        },
        2: {
          page: "1",
          title: "ブラックジャックによろしく",
          url: "assets/frames/ブラックジャックによろしく2.jpg",
          volume: "2",
        },
      },
    };
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
    ContentsBox,
    ModalWindow,
  },
  methods: {
    openModal: function () {
      this.showModal = true;
    },
    onClick: function () {
      this.open = !this.open;
    },
    onClickStar: function () {
      if (this.followed) {
        this.followed = false;
        this.rating--;
      } else {
        this.followed = true;
        this.rating++;
      }
    },
    closeModal: function () {
      this.showModal = false;
    },
    changeOpen: function () {
      this.open = !this.open;
      this.closeModal();
    },
    openFrame: function (event) {
      this.openingImg = event.target.src;
      this.showFrame = true;
    },
    closeFrame: function () {
      this.showFrame = false;
    },
  },
  watch: {
    $route: function (val, oldVal) {
      this.id = val.params.id;
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
.yellowStar {
  color: yellow;
}
</style>
