import firebase from "firebase";
import "firebase/firestore";
export default {

  data() {
    return {
      db: null
    };
  },

  created() {
    this.db = firebase.firestore()
  },

  methods: {

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
      var newId = this.db.collection("lists").doc().id //複数箇所でつかうので事前に取得。
      //listに追加
      this.db.collection("lists").doc(newId)
        .set(listData)
        .then(() => {
          alert(listData.name + "を新規作成しました。");
        })
        .catch(() => {
          alert(listData.name + "を作成するときにエラーが発生しました。");
        });

      //users/<currentUser>/listsのarrayに追加
      this.db.collection("users").doc(listData.ownerId)
        .update({
          lists: firebase.firestore.FieldValue.arrayUnion(newId)
        })
    },

    //@param userId
    //@return Object ListのArray
    getOwnedListsFromUserId(userId) {
      var returnLists = []
      this.db.collection("lists").where("ownerId", "==", userId).get()
        .then((lists) => {
          lists.forEach((list) => {
            returnLists.push(list.data())
          })
        })

      return returnLists
    }
  },
}
