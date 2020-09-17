<template>
  <div :class="{'myMessage':isMyMessage, 'card': true, 'authorMessage': isAuthor}">

    <div class="card-body">
      <h5 class="card-title">{{writerName}}</h5>
      <p>{{message.text}}</p>
      <span>{{getDate}}</span>
      <div v-if=isAuthor>
      <router-link
          :to="{ name: 'Author', params: { id: message.userId } }"
          class="btn btn-primary"
          >詳しく見る</router-link
        >
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Message",
  props: ["message"],

  data() {
    return {
      writerName: "",
      isMyMessage: false,
      isAuthor: false,
      userdata:{},
      currentUser: {
        //id: "YJvLYXKuOw2hMddumjL7",
        id:"4oFo1QKy3X8wGwuGx98h",
        //id:"70fMKGbfmGdqMOnpZwwv"
      },
      followed: false,
      good: 0,
    };
  },

  created() {
    this.getUserById(this.message.userId).then((user) => {
      this.writerName = user.name;
      this.isAuthor = user.isAuthor
    });
    this.isMyMessage = this.message.userId == this.currentUser.id;
    console.log("debug"+this.isAuthor)

  },

  computed: {
    getDate() {
      return this.formatDate(this.message.created);
    },
  },
};
</script>

<style scoped>
.card {
  margin: 2em 3em 1em 0.5em;
}
.card-body {
  color: black;
  text-align: left;
}
.myMessage {
  margin-right: 0.5em;
  margin-left: 3em;
}
.authorMessage{
  background-color:lightgreen
}
</style>