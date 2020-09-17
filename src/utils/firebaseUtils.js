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
        .catch((err) => {
          alert(listData.name + "を作成するときにエラーが発生しました。");
          console.warn("リスト作成でエラーが発生しました。errorFU1", err);
        });

      //users/<currentUser>/listsのarrayに追加
      this.db
        .collection("users")
        .doc(listData.ownerId)
        .update({
          lists: firebase.firestore.FieldValue.arrayUnion(newId)
        }).catch((err) => {
          alert(listData.name + "を作成するときにエラーが発生しました。");
          console.warn("リスト作成でエラーが発生しました。errorFU2", err);
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
        }).catch((err) => {
          alert("リストの取得でエラーが発生しました")
          console.warn("errorFU3", err)
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
        }).catch((err) => {
          alert("リストの取得でエラーが発生しました")
          console.warn("errorFU4", err)
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
        }).catch((err) => {
          alert("リストの取得でエラーが発生しました")
          console.warn("errorFU4", err)
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
        .then(() => {})
        .catch((err) => {
          alert("リスト名の変更に失敗しました")
          console.warn("errorFU5", err)
        });
    },

    //リストにコマを追加
    //@param リストID,コマのファイルパス
    //@return null
    setFrameToList(
      listId,
      framePath,
      title = "タイトルが設定されていません",
      volume = "巻数が設定されていません",
      page = "ページが設定されていません"
    ) {
      var newId = this.db
        .collection("lists")
        .doc(listId)
        .collection("frames")
        .doc().id;
      this.db
        .collection("lists")
        .doc(listId)
        .collection("frames")
        .doc(newId)
        .set({
          id: newId,
          path: framePath,
          addedTime: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {})
        .catch((err) => {
          alert("コマの追加でエラーが発生しました")
          console.warn("errorFU6", err)
        });
    },

    //リストからコマを取得
    //@param リストID
    //@return Array
    getFramesFromList(listId) {
      const frames = [];
      this.db
        .collection("lists")
        .doc(listId)
        .collection("frames")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(frame => {
            var frameData = frame.data();
            frameData.id = frame.id
            frames.push(frameData);
          });
        }).catch((err) => {
          alert("コマの取得でエラーが発生しました")
          console.warn("errorFU7", err)
        });
      return frames;
    },

    //リストのratingを1増やし、user/listに追加。
    //@param listId, userId
    //@return null
    addStarToList(listId, userId) {
      this.db
        .collection("lists")
        .doc(listId)
        .update({
          rating: firebase.firestore.FieldValue.increment(1)
        }).catch((err) => {
          alert("フォローでエラーが発生しました")
          console.warn("errorFU8", err)
        });

      this.db
        .collection("users")
        .doc(userId)
        .update({
          lists: firebase.firestore.FieldValue.arrayUnion(listId)
        }).catch((err) => {
          alert("フォローでエラーが発生しました")
          console.warn("errorFU9", err)
        });
    },

    //リストのratingを１減らし、user/listからlistIdを削除。
    //@param listId, userId
    //@return null
    removeStarFromList(listId, userId) {
      this.db
        .collection("lists")
        .doc(listId)
        .update({
          rating: firebase.firestore.FieldValue.increment(-1)
        }).catch((err) => {
          alert("アンフォローでエラーが発生しました")
          console.warn("errorFU10", err)
        });

      this.db
        .collection("users")
        .doc(userId)
        .update({
          lists: firebase.firestore.FieldValue.arrayRemove(listId)
        }).catch((err) => {
          alert("アンフォローでエラーが発生しました")
          console.warn("errorFU11", err)
        });
    },

    // 公開リストをレーティング順に取得する
    async getListsOrderByRating() {
      const returnLists =[];

      await this.db
        .collection("lists")
        .where("open", "==", true)
        .orderBy("rating", "desc")
        .get()
        .then(qs => {
          qs.forEach(list => {
            returnLists.push(list.data());
          });
        });
        return returnLists;
    },
    //ユーザー情報をIDから取得
    //@param userId
    //@return Object
    getUserById(userId) {
      return this.db.collection("users")
        .doc(userId)
        .get().then((user) => {
          var userData = user.data();
          userData.id = user.id
          return userData;
        }).catch((err) => {
          alert("ユーザー情報取得でエラーが発生しました")
          console.warn("errorFU12", err)
        })
    },

    //メッセージの送信
    //@param userId,String,frameId
    //@return null
    sendMessage(userId, Message, frameId) {
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
          good: 0,
          frame_id: frameId,
          flameId: flameId
        }).catch((err) => {
          alert("メッセージの送信でエラーが発生しました")
          console.warn("errorFU13", err)
        });
    },

    //コマを指定してそのコマに対するメッセージの取得、ちゃんと動くか分かりません
    //@param flameId,int
    //@return Array
    recieveMessage(frameId, count = 10) {
      var returnMessages = [];
      this.db
        .collection("messages")
        .where("frame_id", "==", frameId)
        .orderBy("created","desc")
        .limit(count)
        .get()
        .then(qs => {
          qs.forEach(list => {
            returnLists.push(list.data());
          });
        }).catch((err) => {
          alert("メッセージの取得でエラーが発生しました")
          console.warn("errorFU14", err)
        });
        return returnLists;
    },

    // ユーザがいいねしたリストであれば true を返す。　要でばltぐ
    async isListStared(list_id, user_id = '4oFo1QKy3X8wGwuGx98h') {
      let lists = [];
      await this.db
        .collection("users")
        .doc(user_id)
        .get()
        .then( user => {
          lists = user.data().lists;
        });

        return (lists.includes(list_id));
      },
      
    //メッセージを通報、reportの値を1増やす
    //@param messageId
    //@return null
    reportMessage(messageId) {
      this.db
        .collection("messages")
        .doc(messageId)
        .update({
          report: firebase.firestore.FieldValue.increment(1)
        }).catch((err) => {
          alert("通報処理でエラーが発生しました")
          console.warn("errorFU16", err)
        });

      return (lists.includes(list_id));
    },

    //firebaseのタイムスタンプを文字列にする
    //@param FirebaseTimestamp
    //return String
    formatDate(firebaseTimestamp) {
      var date = firebaseTimestamp.toDate()
      return date.getFullYear() + "/" + (parseInt(date.getMonth()) + 1) + "/" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes()
    },

    //作者一覧をcount件とってくる
    //@param null
    //@return Array
    getAllAuthors(count = 20) {
      var target = []
      this.db
        .collection("users")
        .where("isAuthor", "==", true)
        .limit(count)
        .get()
        .then(authors => {
          authors.forEach(author => {
            var authorObj = author.data()
            authorObj.id = author.id
            target.push(authorObj);
          });
        }).catch((err) => {
          alert("作者一覧取得でエラーが発生しました")
          console.warn("errorFU17", err)
        });
      return target;
    }
  },

};
