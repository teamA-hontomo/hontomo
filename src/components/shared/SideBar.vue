<template>
  <div id="sidebar">
    <ul class="nav flex-column">
      <li class="nav-brand">
        <router-link :to="{ name: 'Top' }" class="my-auto mx-auto disable-router-link-active">
          <img src="/static/logo/hontomo_logo.png" width="100" height="35" class="my-3" />
        </router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{ name: 'Top' }" class="nav-link">
          <font-awesome-icon icon="home" class="fa-lg" />
          <span>トップ</span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{ name: 'Shelf' }" class="nav-link">
          <font-awesome-icon icon="book" class="fa-lg" />
          <span>本棚</span>
        </router-link>
      </li>
    </ul>
    <hr />
    <router-link :to="{ name: 'MyLists' }" class="nav-link">
      <font-awesome-icon icon="list" class="fa-lg" />
      <span>リスト一覧</span>
    </router-link>
    <ul class="nav flex-column">
      <li v-for="list in limitFavoriteLists" v-bind:key="list.id" class="nav-item">
        <router-link :to="{ name: 'List', params: { id: list.id } }" class="nav-link">
          <font-awesome-icon icon="heart" class="fa-lg" v-show="list.id === 'favorite'" />
          <span>{{ list.name}}</span>
        </router-link>
      </li>
    </ul>
    <hr />
    <router-link :to="{ name: 'GlobalLists' }" class="nav-link">
      <font-awesome-icon icon="globe-asia" class="fa-lg" />
      <span>みんなのリスト</span>
    </router-link>
    <hr />
    <router-link :to="{ name: 'AuthorIndex' }" class="nav-link">
      <font-awesome-icon icon="pen-fancy" class="fa-lg" />
      <span>作者一覧</span>
    </router-link>
  </div>
</template>

<script>
import firebase from "firebase";
import "firebase/firestore";
export default {
  data: function () {
    return {
      db: "",
      favoriteLists: [],
      userId: "4oFo1QKy3X8wGwuGx98h", //TODO:ハードコーディング
    };
  },

  created() {
    this.favoriteLists = this.getSubscribedListsFromUserId(this.userId);
  },

  mounted() {
    this.db.collection("lists").onSnapshot(() => {
      this.favoriteLists = this.getSubscribedListsFromUserId(this.userId);
    });
  },

  computed: {
    limitFavoriteLists() {
      this.favoriteLists.sort((a, b) => {
        if (a.created < b.created) {
          return 1;
        } else {
          return -1;
        }
      });
      return this.favoriteLists.slice(0, 3)
    },
  },
};
</script>

<style scoped>
.nav-brand img {
  height: 100%;
  padding: 20px 0;
  width: 65%;
}
hr {
  border-top: 1px solid #eeeeee;
}
.nav-link {
  color: #eeeeee;
}
.navbar-brand {
  color: #ffffff;
}
.router-link-exact-active {
  background-color: #767676;
  color: #ffffff;
}
.disable-router-link-active {
  background-color: #656565;
  color: #eeeeee;
}
</style>
