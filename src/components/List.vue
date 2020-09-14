<template v-if="true">
  <div id='list'>
    <TitleBox v-bind:title='name'>
      <font-awesome-icon v-on:click='add' v-if='!fav' icon='star' slot='button' class='fa-lg' />
      <font-awesome-icon v-on:click='remove' v-if='fav' icon='star' slot='button' class='fa-lg star_yellow' />
      <span slot='button'>{{rating}}</span>
      <button v-on:click='onClick' v-if='open' slot='button' class='btn btn-success'>公開</button>
      <button v-on:click='onClick' v-if='!open' slot='button' class='btn btn-danger'>非公開</button>
    </TitleBox>
    <ContentsBox>
      <span>コンテンツ</span>
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
      list_open: true,
      name: "hoge",
      fav:false,
      author:false,
      date:"dd",
      //nakami:;
    };
  },
  components: {
    TitleBox,
    ContentsBox,
  },
  methods: {
    onClick: function () {
      this.open = !this.open;
    },
    add: function () {
      this.rating++;
      this.fav = !this.fav;
    },
    remove: function () {
      this.rating--;
      this.fav = !this.fav;
    },

  },
};
</script>

<style>
.star_yellow{color:#ffff00;}
</style>
