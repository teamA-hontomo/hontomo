<template>
  <div class="top">
    <TitleBox>
      <h1 class="mx-auto my-auto">HOME</h1>
    </TitleBox>

    <ContentsBox>
      <div class="row">
        <div class="col-md-12">
          <h3 class="mx-auto">ショートカット</h3>
        </div>
      </div>
      <div class="row">
        <div v-for="comic in userComics" class="col-md-3" :key="comic.id">
          <div class="card">
            <img
              :src="comic.coverPath"
              class="card-img-top"
              v-on:click="openDetail"
            />
            <div class="card-body">
              <div class="card-title mx-auto my-auto">
                <p>{{ comic.title }} {{ comic.volume }}巻</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <h3 class="mx-auto">あなたへのおすすめリスト</h3>
        </div>
      </div>
    </ContentsBox>
    <ModalWindow
      v-show="showDetail"
      width="40"
      height="50"
      v-on:fromModal="closeDetail"
    >
      <div class="container">
        <div class="card mx-auto">
          <div class="row no-gutters">
            <div class="col-md-6">
              <img :src="openingImgPath" class="card-img-top mx-auto my-auto" />
            </div>
            <div class="col-md-6 my-auto mx-auto">
              <p>{{ openingImg.title }} {{ openingImg.volume }}巻</p>
              <p>著者 : {{ openingImg.author }}</p>
              <p>出版社: {{ openingImg.publisher }}</p>
              <button
                v-on:click="openViewer(openingImg.id)"
                class="btn btn-danger mt-3"
              >
                読む
              </button>
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
          title: "ブラックジャックによろしく",
          volume: "1",
          publisher: "モーニングKC",
          author: "佐藤秀峰",
          coverPath: "/static/covers/id_1_bj_1.jpg",
          xml_src: "bj_xml"
        },
        {
          id: 2,
          title: "ブラックジャックによろしく",
          volume: "2",
          publisher: "モーニングKC",
          author: "佐藤秀峰",
          coverPath: "/static/covers/id_2_bj_2.jpg",
          xml_src: "bj_xml"
        },
        {
          id: 3,
          title: "ブラックジャックによろしく",
          volume: "3",
          publisher: "モーニングKC",
          author: "佐藤秀峰",
          coverPath: "/static/covers/id_3_bj_3.jpg",
          xml_src: "bj_xml"
        },
        {
          id: 4,
          title: "ブラックジャックによろしく",
          volume: "4",
          publisher: "モーニングKC",
          author: "佐藤秀峰",
          coverPath: "/static/covers/id_4_bj_4.jpg",
          xml_src: "bj_xml"
        }
      ],
      showDetail: false,
      openingImgPath: "",
      openingImg: "",
      xml_src: ""
    };
  },

  methods: {
    openDetail: function(event) {
      this.showDetail = true;
      this.openingImgPath = event.target.src;
      let openingImgId = event.target.src.match(/id_(\d+)/)[1];
      this.openingImg = this.userComics.find(item => item.id == openingImgId);
      this.xml_src = this.openingImg.xml_src;
    },
    closeDetail: function() {
      this.showDetail = false;
    },
    openViewer: function(comicId) {
      this.$router.push({ name: "View", params: { xml_src: this.xml_src } });
    }
  },

  components: {
    TitleBox,
    ContentsBox,
    ModalWindow
  }
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
  margin-bottom: 20px;
}
.card-text {
  color: #eeeeee;
}
</style>
