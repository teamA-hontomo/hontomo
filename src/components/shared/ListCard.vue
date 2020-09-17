<template>
  <div class="list-card mt-3">
    <img :src="list.cover_path" />
    <p class="ttl" v-text="list.name"></p>
    <p>
      作成日:{{
      createdDate
      }}
    </p>
    <p>
      <font-awesome-icon icon="star" class="fa-lg" />
      {{ list.rating }}
    </p>
    <p>
      ステータス:
      {{ openToJapanese}}
    </p>
  </div>
</template>

<script>
export default {
  props: ["list"],

  computed: {
    createdDate() {
      return this.formatDateOnlyDate(this.list.created);
    },

    openToJapanese() {
      return this.list.open ? "公開" : "非公開";
    },
  },
};
</script>

<style scoped>
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
