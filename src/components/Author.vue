<template>
  <div>
    <TitleBox>
      <div class="col-2">
        <UserIcon ::is_author="true" :num="author.num" />
      </div>
      <div class="col py-auto">
        <h1 class="mx-auto my-auto">{{author.name}}</h1>
      </div>
    </TitleBox>
    <div>
      <div>
        <h1>記事一覧</h1>
        <div v-show="interviews.length!=0">
          <ContentsBox>
            <div v-for="interview in interviews" class="col-md-3" :key="interview.id">
              <div class="card">
                <div class="card-body">
                  <p class="card-title">
                    <router-link :to="'/authors/'+id+'/interview/'+interview.id">{{interview.title}}</router-link>
                  </p>
                </div>
              </div>
            </div>
          </ContentsBox>
        </div>
        <div v-show="interviews.length==0">
          <ContentsBox>
            <p>まだインタビューがありません</p>
          </ContentsBox>
        </div>
      </div>
      <div>
        <h1>作品</h1>
        <ContentsBox>
          <div v-for="work in author.works" class="col-md-3" :key="work">
            <div class="card">
              <div class="card-body">
                <p class="card-title">{{work}}</p>
              </div>
            </div>
          </div>
        </ContentsBox>
      </div>
      <div>
        <h1>リスト</h1>
        <div v-show="lists.length!=0">
          <ContentsBox>
            <div v-for="list in lists" class="col-md-3" :key="list.id">
              <div class="card">
                <div class="card-body">
                  <p class="card-title">
                    <router-link :to="'/list/'+list.id">{{list.name}}</router-link>
                  </p>
                </div>
              </div>
            </div>
          </ContentsBox>
        </div>
        <div v-show="lists.length==0">
          <ContentsBox>
            <p>まだリストがありません</p>
          </ContentsBox>
        </div>
      </div>
    </div>
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
    UserIcon,
  },

  data() {
    return {
      id: "",
      author: {},
      interviews: [],
      lists: [],
    };
  },

  created() {
    this.id = this.$route.params.id;
    this.getUserById(this.id).then((user) => (this.author = user));
    this.interviews = this.getInterviewsByUserId(this.id);
    this.lists = this.getOwnedOpenListsFromUserId(this.id);
  },
};
</script>

<style scoped>
.card-body {
  color: black;
}
</style>