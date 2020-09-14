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
          alert(listData.name + "を新規作成しました。");
        })
        .catch(() => {
          alert(this.listData.name + "を作成するときにエラーが発生しました。");
        });
    },
  },
}
