<template>
  <div class="agora">
    <h3 class="agora-title">Agora</h3>
    <div v-for="message in messages" :key="message.id">
      <Message :message="message" />
    </div>
    <div class="input-group">
      <textarea class="form-control" v-model="newMessage" placeholder="メッセージを追加"></textarea>
      <button type="button" class="btn submit-button" @click="submitMessage()">送信</button>
    </div>
  </div>
</template>

<script>
import { BIconAlarm } from "bootstrap-vue";
import Message from "./Message";
export default {
  components: { Message },

  name: "AgoraMain",

  // props:["frameId"],

  data() {
    return {
      newMessage: "",
      frameId: "BDyb4dA26stiHHaMuPhM",
      userId: "4oFo1QKy3X8wGwuGx98h",
      messages: [
        // {
        //   created: "2020/4/1",
        //   id: "qYYDFYQIqCNxawdfFlbH",
        //   text: "hogehgoe",
        //   userId: "4oFo1QKy3X8wGwuGx98h",
        // },
        // {
        //   created: "2020/4/1",
        //   id: "qYYDFYQIqCNxawdfFlbj",
        //   text: "hogehgoe",
        //   userId: "4oFo1QKy3X8wGwuGx98h",
        // },
        // {
        //   created: "2020/4/1",
        //   id: "qYYDFYQIqCNxawdfFlbk",
        //   text: "hogehgoe",
        //   userId: "4oFo1QKy3X8wGwuGx98h",
        // },
        // {
        //   created: "2020/4/1",
        //   id: "qYYDFYQIqCNxawdfFlbl",
        //   text: "hogehgoe",
        //   userId: "4oFo1QKy3X8wGwuGx98h",
        // },
      ],
    };
  },

  created() {
    this.messages = this.recieveMesage(this.frameId);
    console.debug(this.messages);
  },

  methods: {
    submitMessage() {
      if (this.newMessage.length == 0) {
        alert("メッセージを入力してください");
      } else {
        this.sendMessage(this.userId, this.newMessage, this.frameId);
        alert("メッセージを送信しました。");
      }
    },
  },
};
</script>

<style scoped>
.agora {
  height: 100vh;
  overflow-y: scroll;
  background-color: #656565;
}

.agora-title {
  margin: 0.5em;
}

.submit-button {
  background-color: #af3d3d;
}
</style>