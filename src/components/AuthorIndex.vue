<template>
  <div>
    <TitleBox>
      <h2 class="mx-auto my-auto">作者一覧</h2>
    </TitleBox>

    <ContentsBox>
      <div v-for="author in authors" :key="author.id" class="col-md-3">
        <div class="card">
          <div class="card-img-top">
            <UserIcon :is_author="false" :num="author.num" />
          </div>
          <div class="card-body">
            <div class="card-title mx-auto my-auto">
              <p>{{ author.name }}</p>
            </div>
            <div class="card-title mx-auto my-aut">
              代表作 : {{ author.works[0].title }}
            </div>
            <router-link
              :to="{ name: 'Author', params: { id: author.id } }"
              class="btn btn-primary"
              >詳しく見る</router-link
            >
          </div>
        </div>
      </div>
    </ContentsBox>
  </div>
</template>

<script>
import TitleBox from "./shared/TitleBox.vue";
import ContentsBox from "./shared/ContentsBox.vue";
import UserIcon from "./shared/UserIcon.vue";

export default {
  name: "Author",

  components: {
    TitleBox,
    ContentsBox,
    UserIcon
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

<style scoped>
.card {
  background-color: #3e3e3e;
}
</style>
