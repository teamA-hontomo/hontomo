<template>
  <div class="card" :class="{'my-message':isMyMessage}">
    <div class="card-body">
      <h5 class="card-title">{{writerName}}</h5>
      <p>{{message.text}}</p>
      <span>{{getDate}}</span>
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
      currentUser: {
        id: "YJvLYXKuOw2hMddumjL7",
        //id:"4oFo1QKy3X8wGwuGx98h"
      },
    };
  },

  created() {
    this.getUserById(this.message.userId).then((user) => {
      this.writerName = user.name;
    });
    this.isMyMessage = this.message.userId == this.currentUser.id;
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
.my-message {
  margin-right: 0.5em;
  margin-left: 3em;
}
</style>