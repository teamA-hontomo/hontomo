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
    },

    //@param listId 
    //@return Object listData
    async getListFromListId(listId) {
      var returnList = {}
      await this.db.collection("lists").doc(listId).get()
        .then((list) => {
          console.debug("a", list.data())
          returnList = list.data()
        })
      console.debug("hoge,", returnList)
      return returnList
    },

    //@param userId
    //@return Object ListのArray
    getSubscribedListsFromUserId(userId) {
      var returnLists = []
      this.db.collection("users").doc(userId).get()
        .then((user) => {
          user.data().lists.forEach((listId) => {
            this.getListFromListId(listId).then((list) => {
              returnLists.push(list)
            })
          })
        })
      return returnLists
    },


    renameList(listId, newName) {
      this.db.collection("lists").doc(listId).set({
          name: newName
        }, {
          merge: true
        })
        .then(() => {
        })
    },
  }
}
