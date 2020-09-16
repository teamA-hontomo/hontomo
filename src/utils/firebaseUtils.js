import firebase from "firebase";
import "firebase/firestore";
export default {
  data() {
    return {
      db: null
    };
  },

  created() {
    this.db = firebase.firestore();
  },

  methods: {
    //リストを新規作成する
    // @param Object
    // {
    //         name: this.listName,
    //         created: firebase.firestore.FieldValue.serverTimestamp(),
    //         open: false,
    //         ownerId: "4oFo1QKy3X8wGwuGx98h",
    //         rating: 0
    //  }
    // @return null
    createList(listData) {
      var newId = this.db.collection("lists").doc().id; //複数箇所でつかうので事前に取得。
      listData.id = newId;
      (listData.created = firebase.firestore.FieldValue.serverTimestamp()), //firebaseのサーバー時間を取得。
      //listに追加
      this.db
        .collection("lists")
        .doc(newId)
        .set(listData)
        .then(() => {
          alert(listData.name + "を新規作成しました。");
        })
        .catch(() => {
          alert(listData.name + "を作成するときにエラーが発生しました。");
        });

      //users/<currentUser>/listsのarrayに追加
      this.db
        .collection("users")
        .doc(listData.ownerId)
        .update({
          lists: firebase.firestore.FieldValue.arrayUnion(newId)
        });
    },

    //ユーザーIDからそのユーザーがオーナーのリストを持ってくる
    //@param userId
    //@return Object ListのArray
    getOwnedListsFromUserId(userId) {
      var returnLists = [];
      this.db
        .collection("lists")
        .where("ownerId", "==", userId)
        .get()
        .then(lists => {
          lists.forEach(list => {
            returnLists.push(list.data());
          });
        });

      return returnLists;
    },

    //リストIDからリスト情報を持ってくる。
    //@param listId
    //@return Object listData
    async getListFromListId(listId) {
      var returnList = {};
      await this.db
        .collection("lists")
        .doc(listId)
        .get()
        .then(list => {
          returnList = list.data();
        });
      return returnList;
    },

    //ユーザーIDからそのユーザーがいいねしてるorそのユーザーがオーナーのリストを取得
    //@param userId
    //@return Object ListのArray
    getSubscribedListsFromUserId(userId) {
      var returnLists = [];
      this.db
        .collection("users")
        .doc(userId)
        .get()
        .then(user => {
          user.data().lists.forEach(listId => {
            this.getListFromListId(listId).then(list => {
              returnLists.push(list);
            });
          });
        });
      return returnLists;
    },

    //リストの名前を変更
    //@param listId ,新しい名前
    //@return null
    renameList(listId, newName) {
      this.db
        .collection("lists")
        .doc(listId)
        .set({
          name: newName
        }, {
          merge: true
        })
        .then(() => {});
    },

    //リストにコマを追加
    //@param リストID,コマのファイルパス
    //@return null
    setFrameToList(listId, framePath, title = "タイトルが設定されていません", volume = "巻数が設定されていません", page = "ページが設定されていません") {
      var newId = this.db.collection("lists").doc(listId)
        .collection("frames").doc().id;
      this.db
        .collection("lists")
        .doc(listId)
        .collection("frames")
        .doc(newId)
        .set({
          path: framePath,
          page: page,
          title: title,
          volume: volume,
          addedTime: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {});
    },

    getFramesFromList(listId) {
      const frames = [];
      this.db
        .collection("lists")
        .doc(listId)
        .collection("frames")
        .get()
        .then(async docs => {
          await docs.forEach(doc => {
            let value = doc.data();
            let id = doc.id;
            let result = {};
            result[id] = value;
            frames.push(result);
          });
        });
      //console.log(frames);
      return frames;
    },

    //リストのratingを1増やし、user/listに追加。
    addStarToList(listId, userId) {
      this.db
        .collection("lists")
        .doc(listId)
        .update({
          rating: firebase.firestore.FieldValue.increment(1)
        });
      this.db
        .collection("users")
        .doc(userId)
        .update({
          lists: firebase.firestore.FieldValue.arrayUnion(listId)
        });
    },

    //リストのratingを１減らし、user/listからlistIdを削除。
    removeStarFromList(listId, userId) {
      this.db
        .collection("lists")
        .doc(listId)
        .update({
          rating: firebase.firestore.FieldValue.increment(-1)
        });
      this.db
        .collection("users")
        .doc(userId)
        .update({
          lists: firebase.firestore.FieldValue.arrayRemove(listId)
        });
    },

    getUserById(userId) {
      return this.db.collection("users")
        .doc(userId)
        .get().then((user) => {
          return user.data();
        })
    },

    //メッセージの送信
    sendMessage(userId, Message, frame_id) {
      var newId = this.db.collection("messages").doc().id;
      this.db
        .collection("messages")
        .doc(newId)
        .set({
          text: Message,
          userId: userId,
          created: firebase.firestore.FieldValue.serverTimestamp(),
          id: newId,
          report: 0,
          frame_id: frame_id
        });
    },

    //コマを指定してそのコマに対するメッセージの取得、ちゃんと動くか分かりません
    recieveMesage(frame_id) {
      var returnMessages = [];
      this.db
        .collection("messages")
        .where("frame_id", "==", frame_id)
        .orderBy("created")
        .get()
        .then(messages => {
          messages.forEach(message => {
            returnMessages.push(message.data());
          });
        });

      return returnMessages;
    },

    //メッセージを通報、reportの値を1増やす
    reportMessage(messageId) {
      this.db
        .collection("messages")
        .doc(messageId)
        .update({
          report: firebase.firestore.FieldValue.increment(1)
        });
    },

    formatDate(firebaseTimestamp) {
      var date = firebaseTimestamp.toDate()
      return date.getFullYear() + "/" + (parseInt(date.getMonth()) + 1) + "/" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes()
    }
  }
};
