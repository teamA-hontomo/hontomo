<template>
  <div id='list'>
    <TitleBox v-bind:title='id + "のリスト"'>
      <button v-on:click='onClick' v-if='open' slot='button' class='btn btn-success'>公開</button>
      <button v-on:click='onClick' v-if='!open' slot='button' class='btn btn-danger'>非公開</button>
    </TitleBox>
    <ContentsBox>
      <span>コンテンツ</span>
    </ContentsBox>
  </div>
</template>
<script>
import TitleBox from "./TitleBox.vue";
import ContentsBox from "./ContentsBox.vue";
export default {
  data: function () {
    return {
      id: this.$route.params.id,
      open: true,
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
