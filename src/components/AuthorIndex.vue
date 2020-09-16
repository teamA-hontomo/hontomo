<template>
  <div>
    <TitleBox>
      <span class="mx-auto my-auto">作者一覧</span>
    </TitleBox>
    <div v-for="author in authors" :key="author.id">
      <router-link
        :to="{ name:'Author', params: { id: author.id } }"
        class="nav-link"
      >{{author.name}}:{{author.id}}</router-link>
    </div>
  </div>
</template>

<script>
import TitleBox from "./shared/TitleBox.vue";

export default {
  name: "Author",

  components: {
    TitleBox,
  },

  data() {
    return {
      authors: [],
    };
  },

  created() {
    this.authors = this.getAllAuthors();
  },
};
</script>

<style>
</style>