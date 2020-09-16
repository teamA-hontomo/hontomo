<template>
  <div>
    <TitleBox>
      <span class="mx-auto my-auto">作者詳細</span>
    </TitleBox>
    id:{{id}}
  </div>
</template>

<script>
import TitleBox from "./shared/TitleBox.vue";
import ContentsBox from "./shared/ContentsBox.vue";

export default {
  name: "Author",

  components: {
    TitleBox,
    ContentsBox,
  },

  data() {
    id: "";
  },

  created() {
    this.id = this.$route.params.id;
  },
};
</script>

<style>
</style>