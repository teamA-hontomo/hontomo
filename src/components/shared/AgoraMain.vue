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
        <Message :message="message"> 
         <!-- <font-awesome-icon
            icon='thumbs-up'
            class='fa-lg'
            v-on:click='onClickGood(message.id)'
          />
           <span>{{ message.good }}</span>
           -->
          </Message>
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

  // props:["frameId"],

  data() {
    return {
      newMessage: "",
      frameId: "BDyb4dA26stiHHaMuPhM",
      userId: "4oFo1QKy3X8wGwuGx98h",
      //userId: "public",
      db: null,
      isAuthor : false,
      messages: [
      ],
      author_mes:[
      ],
      user_mes:[
      ]

    };
  },

  created() {
    this.messages = this.recieveMessage(this.frameId,10);
    for (var message in this.messages){
      this.getUserById(self.message.userId).then((user) => {
      this.isAuthor = message.isAuthor
      });
      if(isAuthor){
        author_mes.push(self.message);
      }
      else{
        user_mes.push(self.message);
      }

    }

    console.log(this.messag);

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

    onClickGood(messageid) {

      this.goodMessage(messageid,this.userId);
    },

    goodColor(messageid) {
      var fav = true;
      this.db
      .collection("users")
      .doc(this.userId)
      .get()
      .then((user) => {
        fav = user.data().messages.includes(messageid) ? true : false;
        console.log(fav)
        if (fav) {
        return { clickedGood: true };
      } else {
        return { clickedGood: false };
      }
        
      });

    },



  },

  computed: {
    isMessageExist() {
      return this.messages.length > 0;
    },

  },

  mounted(){
    /*this.db.collection("messages").onSnapshot(()=>{
      this.messages = this.recieveMessage(this.frameId,20);
    })*/
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

.clickedGood {
  color: blue;
}

</style>