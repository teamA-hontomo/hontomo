<template>
  <div>
    <ContentsBox class="mt-3">
      <h2 class="my-3">マイリスト一覧</h2>
      <ul id="v-for-object" class="cards-list">
        <li v-for="list in myLists" :key="list.id">
          <router-link :to="{ name: 'List', params: { id: list.id } }" class="nav-link">
            <ListCard :list="list"></ListCard>
          </router-link>
        </li>
      </ul>
    </ContentsBox>
  </div>
</template>

<script>
import ContentsBox from "./shared/ContentsBox.vue";
import ListCard from "./shared/ListCard.vue";

export default {
  components: {
    ContentsBox,
    ListCard,
  },

  data() {
    return {
      myLists: [],
      userId: "4oFo1QKy3X8wGwuGx98h", //TODO:ハードコーディング
    };
  },

  created() {
    this.myLists = this.getOwnedListsFromUserId(this.userId);
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
  color: #fff;
}
.list-card:hover {
  opacity: 0.5;
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
