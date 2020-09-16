<template>
  <div class="card">
    <p>{{message.text}}</p>
    <p>{{message.id}}</p>
    <p>{{message.userId}}</p>
    <p>{{message.created}}</p>
  </div>
</template>

<script>
export default {
  name: "Message",
  props: ["message"],
};
</script>

<style scoped>
p {
  color: black;
}
</style>