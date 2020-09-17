<template>
  <div class='shelf'>
    <TitleBox>
      <h1 class='mx-auto my-auto'>あなたの本棚</h1>
    </TitleBox>
    <ContentsBox>
      <div v-for='comic in userComics' class='col-md-3' :key='comic.id'>
        <div class='card'>
          <img :src='comic.coverPath' class='card-img-top' v-on:click='openDetail' />
          <div class='card-body'>
            <div class='card-title mx-auto my-auto'>
              <p>{{ comic.title }} {{ comic.volume }}巻</p>
            </div>
          </div>
        </div>
      </div>
    </ContentsBox>
    <ModalWindow v-show='showDetail' width='40' height='50' v-on:fromModal='closeDetail'>
      <div class='container'>
        <div class='card mx-auto'>
          <div class='row no-gutters'>
            <div class='col-md-6'>
              <img :src='this.openingImgPath' class='card-img-top mx-auto my-auto' />
            </div>
            <div class='col-md-6 my-auto mx-auto'>
              <p>{{ this.openingImg.title }} {{ this.openingImg.volume }}巻</p>
              <p>著者 : {{this.openingImg.author }}</p>
              <p>出版社: {{ this.openingImg.author }}</p>
              <button v-on:click='openViewer' class='btn btn-danger mt-3'>読む</button>
            </div>
          </div>
        </div>
      </div>
    </ModalWindow>
  </div>
</template>
<script>
import ModalWindow from "./shared/ModalWindow.vue";
import ContentsBox from "./shared/ContentsBox.vue";
import TitleBox from "./shared/TitleBox.vue";
export default {
  data() {
    return {
      userComics: [
        {
          id: 1,
          title: "鬼滅の刃",
          volume: "1",
          publisher: "集英社",
          author: "吾峠呼世晴",
          coverPath: "/static/covers/id_1_kimetu_no_yaiba_1.jpg",
          xml_src: "test_xml"
        },
        {
          id: 2,
          title: "鬼滅の刃",
          volume: "2",
          publisher: "集英社",
          author: "吾峠呼世晴",
          coverPath: "/static/covers/id_2_kimetu_no_yaiba_2.jpg",
          xml_src: "test_xml"
        },
      ],
      showDetail: false,
      openingImgPath: "",
      openingImg: "",
      xml_src: ""
    };
  },
  methods: {
    openDetail: function (event) {
      this.showDetail = true;
      this.openingImgPath = event.target.src;
      let openingImgId = event.target.src.match(/id_(\d+)/)[1];
      this.openingImg = this.userComics.find((item) => item.id == openingImgId);
      this.xml_src = this.openingImg.xml_src;
    },
    closeDetail: function () {
      this.showDetail = false;
    },
    openViewer: function () {
      this.$router.push({name: 'View', params: {'xml_src': this.xml_src}});
    },
  },
  components: {
    TitleBox,
    ContentsBox,
    ModalWindow,
  },
};
</script>
<style scoped>
h1 {
  padding: 20px 0;
  font-size: 34px;
  font-family: revert;
}
.card {
  background-color: #3e3e3e;
}
.card-text {
  color: #eeeeee;
}
</style>
