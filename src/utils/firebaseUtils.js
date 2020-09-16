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
        .set(
          {
            name: newName
          },
          {
            merge: true
          }
        )
        .then(() => {});
    },

    //リストにコマを追加
    //@param リストID,コマのファイルパス
    //@return null
    setFrameToList(listId, framePath) {
      this.db
        .collection("lists")
        .doc(listId)
        .collection("frames")
        .add({
          path: framePath,
          addedTime: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {});
    },

    getFramesFromList(listId) {
      const frames = []
      this.db.collection("lists").doc(listId)
        .collection("frames").get().then((querySnapshot) => {
          querySnapshot.forEach((frame) => {
            frames.push(frame.data())
          })
        })
      return frames
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
    }
  }
};
