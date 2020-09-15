<template>
  <div class="global-lists">
    <div class="search-box">
      <input v-model="message" placeholder="検索" class="mt-3" />
    </div>
    <ContentsBox class="mt-3">
      <h2 class="my-3">人気のリスト一覧</h2>
      <ul id="v-for-object" class="cards-list">
        <li v-for="id in Object.keys(lists)" :key="id">
          <div class="list-card mt-3">
            <img :src="require('../assets/' + lists[id]['frames'][id]['path'])" />
            <p class="ttl">{{ lists[id]["name"] }}</p>
            <p>登録日：{{ lists[id]["created"] }}</p>
            <div slot="button">
              <font-awesome-icon
                icon="star"
                class="fa-lg"
                v-on:click="onClickStar(id)"
                v-bind:class="starColor(id)"
              />
              {{ lists[id]["rating"] }}
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
export default {
  data: function() {
    return {
      id: this.$route.params.id,
      open: true,
      message: "",
      ito: {
        followLists: [1, 3]
      },
      // followInfos: {
      //   1: {
      //     followed: false,
      //     yellowStar: false
      //   }
      // },
      lists: {
        1: {
          frames: {
            1: {
              addedTime: "時間",
              path: "frames/ブラックジャックによろしく1.jpg"
            }
          },
          name: "ワンピース名場面集1",
          rating: 112,
          created: "2020/09/02",
          open: true,
          ownerId: "ownerId"
        },
        2: {
          frames: {
            2: {
              addedTime: "時間",
              path: "frames/ブラックジャックによろしく2.jpg"
            }
          },
          name: "ワンピース名場面集2",
          rating: 1,
          created: "2020/09/02",
          open: true,
          ownerId: "ownerId"
        },
        3: {
          frames: {
            3: {
              addedTime: "時間",
              path: "frames/ブラックジャックによろしく1.jpg"
            }
          },
          name: "ワンピース名場面集3",
          rating: 2,
          created: "2020/09/08",
          open: true,
          ownerId: "ownerId"
        },
        4: {
          frames: {
            4: {
              addedTime: "時間",
              path: "frames/ブラックジャックによろしく2.jpg"
            }
          },
          name: "ワンピース名場面集1",
          rating: 12,
          created: "2020/09/10",
          open: true,
          ownerId: "ownerId"
        }
      }
    };
  },

  components: {
    ContentsBox
  },
  methods: {
    starColor: function(id) {
      if (this.lists[id].followed) {
        return { yellowStar: true };
      } else {
        return { yellowStar: false };
      }
    },
    onClickStar: function(id) {
      if (this.lists[id].followed) {
        this.lists[id].followed = false;
        this.lists[id].rating--;
      } else {
        this.lists[id].followed = true;
        this.lists[id].rating++;
      }
    }
  }
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
