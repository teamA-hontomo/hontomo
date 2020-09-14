<template>
  <div id='list'>
    <TitleBox v-bind:title='id + "のリスト"'>
      <font-awesome-icon icon='star' class='fa-lg' slot='button' />
      <span slot='button'>{{ rating }}</span>
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
      name: "サンプルタイトル",
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
  },
};
</script>
