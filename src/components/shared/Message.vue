<template>
  <div class="card">
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
    };
  },

  created() {
    this.getUserById(this.message.userId).then((user) => {
      this.writerName = user.name;
    });
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
  margin-right: 1em;
  margin-left: 0.5em;
}
</style>