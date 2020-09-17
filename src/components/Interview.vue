<template>
  <div>
    <TitleBox>
      <h1 class='mx-auto my-auto'>{{ interview.title }}</h1>
    </TitleBox>
    <ContentsBox>
      <div class="interview">
        <div class="balloon" v-bind:class="{author: balloon.is_author}" v-for="balloon in interview.balloons" :key="balloon.id">
          <div class="user-icon">
            <UserIcon :is_author="balloon.is_author" :num="getNum(balloon)"></UserIcon>
          </div>
          <div class="body-name">
            <div class="name">
              {{ getName(balloon.is_author) }}
            </div>
            <div class="body">
              <div class="tri"></div>
              {{ balloon.body }}
            </div>
          </div>
        </div>
      </div>
    </ContentsBox>
  </div>
</template>

<script>
import firebase from "firebase";
import "firebase/firestore";
import TitleBox from "./shared/TitleBox";
import ContentsBox from "./shared/ContentsBox";
import UserIcon from "./shared/UserIcon";

export default {
  name: "Interview",
  data() {
    return {
      interview: {},
      author: {},
    };
  },
  components: {
    TitleBox,
    ContentsBox,
    UserIcon
  },
  async created() {
    const db = firebase.firestore();
    db.collection("users")
      .doc(this.$route.params.id)
      .collection("interview")
      .doc(this.$route.params.interview_id)
      .get()
      .then(interview => {
        this.interview = interview.data();
      });

    db.collection("users")
      .doc(this.$route.params.id)
      .get()
      .then(user => {
        this.author = user.data();
      })
  },
  methods: {
    getNum(balloon) {
      if (balloon.is_author) {
        return this.author.num + "";
      } else {
        return "3"
      }
    },
    getName(is_author) {
      if (is_author) {
        return this.author.name;
      } else {
        return "インタビュアー";
      }
    }
  }
};
</script>

<style scoped>

.interview {
  margin: 30px;
  width: 100%;
}

.balloon {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
}

.balloon.author {
  flex-direction: row;
}

.balloon .name {
  text-align: right;
}

.balloon.author .name {
  text-align: left;
}

.body-name {
  margin: 0 20px;
}

.body {
  color: black;
  background-color: white;
  padding: 10px 20px;
  border-radius: 10px;
  position: relative;
  max-width: 80%;
}

.balloon:not(.author) .body {
  margin-left: auto;
}

.tri {
  position: absolute;
  top: 5px;
  border: 10px solid transparent;
}

.balloon:not(.author) .tri {
  right: -15px;
  border-left: 10px solid white;
}

.balloon.author .tri {
  left: -15px;
  border-right: 10px solid white;
}
</style>