<template>
  <div id="list">
    <TitleBox v-bind:title="name">
      <font-awesome-icon
        v-on:click="add"
        v-if="!fav"
        icon="star"
        slot="button"
        class="fa-lg"
      />
      <font-awesome-icon
        v-on:click="remove"
        v-if="fav"
        icon="star"
        slot="button"
        class="fa-lg star_yellow"
      />
      <span slot="button">{{ rating }}</span>
      <button
        v-on:click="onClick"
        v-if="open"
        slot="button"
        class="btn btn-success"
      >
        公開
      </button>
      <button
        v-on:click="onClick"
        v-if="!open"
        slot="button"
        class="btn btn-danger"
      >
        非公開
      </button>
    </TitleBox>
    <ContentsBox>
      <!--
      <span>コンテンツ</span>
      -->


      <div v-for='id in cartoonFrames' class="col-md-3" :key='id'>
       <div class="card">
          <img
            class="card-img-top"
            src= "../assets/frames/ブラックジャックによろしく1.jpg"
            alt="スダンダードコースのイメージ画像"
          />
          <hr />
          <div class="card-body">
            <h4 class="card-title">{{id.title}}<br>
            {{id.volume}}巻 {{id.page}}ページ
            </h4>
            <p class="card-text">
              登録日：{{id.date}}
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
  data: function() {
    return {
      id: this.$route.params.id,
      open: true,
      rating: 5,
      list_open: true,
      name: "hoge",
      fav: false,
      cartoonFrames: {
        "1": {
          page: "1",
          title: "ブラックジャックによろしく",
          url: "../assets/frames/ブラックジャックによろしく1.jpg",
          date: "2020/07/02",
          volume: "1"
        },
        "2": {
          page: "1",
          title: "ブラックジャックによろしく",
          url: "../assets/frames/ブラックジャックによろしく2.jpg",
          date: "2020/07/02",
          volume: "2"
        },
        "3": {
          page: "1",
          title: "ブラックジャックによろしく",
          url: "../assets/frames/ブラックジャックによろしく2.jpg",
          date: "2020/07/02",
          volume: "2"
        },
        "4": {
          page: "1",
          title: "ブラックジャックによろしく",
          url: "../assets/frames/ブラックジャックによろしく2.jpg",
          date: "2020/07/02",
          volume: "2"
        },
        "5": {
          page: "1",
          title: "ブラックジャックによろしく",
          url: "../assets/frames/ブラックジャックによろしく2.jpg",
          date: "2020/07/02",
          volume: "2"
        }
      }
    };
  },
  components: {
    TitleBox,
    ContentsBox
  },
  methods: {
    onClick: function() {
      this.open = !this.open;
    },
    add: function() {
      this.rating++;
      this.fav = !this.fav;
    },
    remove: function() {
      this.rating--;
      this.fav = !this.fav;
    }
  }
};
</script>

<style>
.star_yellow {
  color: #ffff00;
}
.card{
  color: #000000;
  margin-bottom: 20px;
  margin-top: 50px;
}
hr {
  border-top: 1px solid #000000;
}
</style>
