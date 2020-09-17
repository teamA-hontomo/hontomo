<template>
  <div class="agora">
    <div class="row">
      <div class="col-1">
        <font-awesome-icon icon="times" class="fa-2x mx-auto my-auto" v-on:click="closeAgora" />
      </div>
      <div class="col-11">
        <h3 class="agora-title">Agora</h3>
      </div>
    </div>
    <div class="input-group">
      <textarea class="form-control" v-model="newMessage" placeholder="メッセージを追加"></textarea>
      <button type="button" class="btn submit-button" @click="submitMessage()">送信</button>
    </div>
    <div v-show="isMessageExist">
      <div v-for="message in messages" :key="message.id">
        <Message :message="message" />
      </div>
    </div>
    <div v-show="!isMessageExist">
      <p>まだこのコマにはメッセージがありません</p>
    </div>
  </div>
</template>

<script>
import { BIconAlarm } from "bootstrap-vue";
import Message from "./Message";
import firebase from "firebase";
import "firebase/firestore";
export default {
  components: { Message },
  name: "AgoraMain",
  props:["frameId"],
  data() {
    return {
      newMessage: "",
      // frameId: "BDyb4dA26stiHHaMuPhM",
      //userId: "4oFo1QKy3X8wGwuGx98h",
      userId:"1i9prr2zr9XYQtSQjgbM",
      // userId: "public",
      db: null,
      messages: [],
    };
  },
  methods: {
    submitMessage() {
      if (this.newMessage.length == 0) {
        alert("メッセージを入力してください");
      } else {
        this.sendMessage(this.userId, this.newMessage, this.frameId);
        alert("メッセージを送信しました。");
      }
      //メッセージボックスを空にする
      this.newMessage = "";
    },
    closeAgora() {
      this.$emit("fromAgora");
    },
  },
  computed: {
    isMessageExist() {
      return this.messages.length > 0;
    },
  },
  mounted() {
    this.db.collection("messages").onSnapshot(() => {
      this.messages = this.recieveMessage(this.frameId, 10);
    });
  },
  watch: {
    frameId: function() {
      this.messages = this.recieveMessage(this.frameId);
    }
  }
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