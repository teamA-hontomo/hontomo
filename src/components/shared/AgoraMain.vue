<template>
  <div class="agora">
    <div v-for="message in messages" :key="message.id">
      <Message :message="message" />
    </div>
    
  </div>
</template>

<script>
import Message from "./Message";
export default {
  components: { Message },
  name: "AgoraMain",
  data() {
    return {
      messages: [
        {
          created: "2020/4/1",
          id: "qYYDFYQIqCNxawdfFlbH",
          text: "hogehgoe",
          userId: "4oFo1QKy3X8wGwuGx98h",
        },
        {
          created: "2020/4/1",
          id: "qYYDFYQIqCNxawdfFlbj",
          text: "hogehgoe",
          userId: "4oFo1QKy3X8wGwuGx98h",
        },
        {
          created: "2020/4/1",
          id: "qYYDFYQIqCNxawdfFlbk",
          text: "hogehgoe",
          userId: "4oFo1QKy3X8wGwuGx98h",
        },
        {
          created: "2020/4/1",
          id: "qYYDFYQIqCNxawdfFlbl",
          text: "hogehgoe",
          userId: "4oFo1QKy3X8wGwuGx98h",
        },
      ],
    };
  },
};
</script>

<style scoped>
.agora {
  height: 100vh;
  overflow-y: scroll;
}
</style>