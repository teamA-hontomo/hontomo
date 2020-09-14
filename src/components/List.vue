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
        <button v-on:click='onClick' v-if='open' class='btn btn-success'>公開</button>
        <button v-on:click='onClick' v-if='!open' class='btn btn-danger'>非公開</button>
      </div>
    </TitleBox>

    <ContentsBox>
      <div v-for='id in Object.keys(cartoonFrames)' class='col-md-3' :key='id'>
        <div class='card'>
          <img :src='require("../" + cartoonFrames[id]["url"])' class='card-img-top' />
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
  </div>
</template>
<script>
import TitleBox from "./shared/TitleBox.vue";
import ContentsBox from "./shared/ContentsBox.vue";

export default {
  data: function () {
    return {
      id: this.$route.params.id,
      open: true,
      rating: 5,
      name: "リストサンプルタイトル",
      followed: false,
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
  },
  components: {
    TitleBox,
    ContentsBox,
  },
  methods: {
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
