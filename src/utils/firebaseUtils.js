import firebase from "firebase";
import "firebase/firestore";
export default {

  data() {
    return {
      listName: "新規リスト",
      db: null
    };
  },

  created() {
    this.db = firebase.firestore()
  },
/*
  @param listData
{
          name: this.listName,
          created: firebase.firestore.FieldValue.serverTimestamp(),
          open: false,
          ownerId: "4oFo1QKy3X8wGwuGx98h",
          rating: 0
        }
 */
  methods: {
    createList(listData) {
      this.db.collection("lists")
        .add(listData)
        .then(() => {
          alert(this.listName + "を新規作成しました。");
        })
        .catch(() => {
          alert(this.listName + "を作成するときにエラーが発生しました。");
        });
    },
  },
}
