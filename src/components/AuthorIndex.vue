<template>
  <div>
    <TitleBox>
      <span class="mx-auto my-auto">作者一覧</span>
    </TitleBox>
    <div v-for="author in authors" :key="author.id">
      <ContentsBox>
        <p>{{ author.name }}</p>
        <p>代表作:{{ author.works[0].title }}</p>
        <router-link
          :to="{ name: 'Author', params: { id: author.id } }"
          class="btn btn-primary"
          >詳しく見る</router-link
        >
      </ContentsBox>
    </div>
  </div>
</template>

<script>
import TitleBox from "./shared/TitleBox.vue";
import ContentsBox from "./shared/ContentsBox.vue";

export default {
  name: "Author",

  components: {
    TitleBox,
    ContentsBox
  },

  data() {
    return {
      authors: []
    };
  },

  created() {
    this.authors = this.getAllAuthors();
  }
};
</script>

<style></style>
