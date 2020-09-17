<template>
  <div class="global-lists">
    <div class="search-box">
      <input type="text" v-model="searchWord" placeholder="検索" class="mt-3" />
      <font-awesome-icon icon="search" ckass="fa-lg" />
    </div>
    <ContentsBox class="mt-3">
      <h2 class="my-3">人気のリスト一覧</h2>
      <ul id="v-for-object" class="cards-list">
        <li v-for="list in filteredLists" :key="list.id">
          <div class="list-card mt-3">
            <img :src="'../../' + list.cover_path" />
            <p class="ttl" v-text="list.name"></p>
            <p>登録日：{{ list.created.toDate() }}</p>
            <div slot="button">
              <font-awesome-icon icon="star" class="fa-lg" v-bind:class="starColor(list.id)" />
              <!-- v-on:click="onClickStar(list.id)" -->
              {{ list.rating }}
            </div>
          </div>
        </li>
      </ul>
    </ContentsBox>
  </div>
</template>

<script>
import ContentsBox from "./shared/ContentsBox.vue";
import { firestore } from "firebase";
import "firebase/firestore";

export default {
  data() {
    return {
      id: this.$route.params.id,
      open: true,
      searchWord: "",
      ito: {
        followLists: [1, 3],
      },
      // followInfos: {
      //   1: {
      //     followed: false,
      //     yellowStar: false
      //   }
      // },
      lists: [],
      frames: [],
      db: "",
    };
  },
  computed: {
    filteredLists() {
      console.log(this.lists);
      return this.lists.filter((list) => {
        return list.name.indexOf(this.searchWord) !== -1;
      });
    },
    // getDate() {
    //   return this.formatDate(this.lists.created);
    // },
  },
  async created() {
    // this.db = firebase.firestore();
    console.log("fetch lists");
    this.lists = this.getListsOrderByRating();
    
    console.log("this.lists", this.lists);
    // this.frames = this.getFramesFromList(this.id);
  },
  components: {
    ContentsBox,
  },
  methods: {
    // starColor: function(list) {
    //   if (list.followed) {
    //     return { yellowStar: true };
    //   } else {
    //     return { yellowStar: false };
    //   }
    // },
    starColor: async function (list_id) {
      const bool = await this.isListStared(list_id);
      if (true) {
        console.log("yellow");
        return { yellowStar: true };
      } else {
        console.log("not yellow");
        return { yellowStar: false };
      }
    },
    // onClickStar: function(list) {
    //   if (list.followed) {
    //     this.lists[id].followed = false;
    //     this.lists[id].rating--;
    //   } else {
    //     this.lists[id].followed = true;
    //     this.lists[id].rating++;
    //   }
    // }
  },
};
</script>

<style>
.global-lists {
  text-align: left;
}
.cards-list {
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  width: 100%;
}
.cards-list li {
  width: 33%;
}
.list-card {
  margin: 0 15px;
  padding: 25px;
  background: rgb(44, 43, 43);
}
.list-card img {
  width: 100%;
}
ul {
  list-style: none;
}
h2 {
  width: 100vw;
  padding: 10px 20px;
}
.yellowStar {
  color: yellow;
}
.ttl {
  font-size: 20px;
  font-weight: bold;
  margin: 10px 0;
}
</style>
