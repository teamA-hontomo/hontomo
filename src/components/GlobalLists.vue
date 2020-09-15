<template>
  <div class='global-lists'>
    <div class="search-box">
      <input v-model="message" placeholder="検索" class="mt-3">
    </div>
    <ContentsBox class="mt-3">
      <h2 class="my-3">人気のリスト一覧</h2>
      <ul id="v-for-object" class="cards-list">
        <li>
          <Card></Card>
        </li>
        <li>
          <Card></Card>
        </li>
        <li>
          <Card></Card>
        </li>
      </ul>
    </ContentsBox>
  </div>
</template>

<script>
import ContentsBox from "./shared/ContentsBox.vue";
import Card from "./shared/Card";
import { firestore } from 'firebase'
export default {
  data: function() {
    return {
      
    };
  },
  components: {
    ContentsBox,
    Card,
  }
}
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
  padding: 0 25px;
}
ul {
  list-style: none;
}
h2 {
  width: 100vw;
  padding: 10px 20px;
}
</style>