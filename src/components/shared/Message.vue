<template>
  <div class="card">
    <div class="card-body">
      <p>{{message.text}}</p>
      <p>{{message.id}}</p>
      <p>名前:{{writerName}}</p>
      <p>{{message.userId}}</p>
      <p>{{message.created}}</p>
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
};
</script>

<style scoped>
.card-body {
  color: black;
  text-align: left;
}
</style>