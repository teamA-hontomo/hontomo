<template>
  <div>
    <b-modal id="modal" hide-footer centered title="保存先">
      <div class="lists">
        <div class="list" v-for="list in lists" :key="list.id">
          <div class="list-name">{{ list.name }}</div>
          <b-button pill v-on:click="saveFrame(list.id)">保存</b-button>
        </div>
      </div>
      <div class="new-list-btn" v-if="!show_input" @click="showListInput">
        <font-awesome-icon icon="plus" class="fa-lg"></font-awesome-icon>
        <div>新しいリストを作成</div>
      </div>
      <div v-if="show_input" class="new-list-wrap">
        <b-form-input id="list-name-input" v-model="list_name" placeholder="リスト名を入力"></b-form-input>
        <b-button pill v-on:click="addList">作成</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script scoped>
import { BModal, BButton, VBModal, BFormInput } from "bootstrap-vue";

export default {
  name: "FrameSaveModal",
  data() {
    return {
      lists: [],
      list_name: '',
      show_input: false,
    };
  },
  props: ['frame_src'],
  components: { "b-modal": BModal, "b-button": BButton, 'b-form-input': BFormInput},
  directives: {
    "b-modal": VBModal
  },
  created() {
    this.lists = this.getOwnedListsFromUserId("4oFo1QKy3X8wGwuGx98h"); //TODO: ユーザーのidをちゃんと引っ張ってきて入れるようにする
  },
  methods: {
    saveFrame(list_id) {
      this.setFrameToList(list_id, 'frames/' + this.frame_src);
      this.$bvModal.hide('modal');
    },
    show() {
      this.$bvModal.show('modal');
    },
    showListInput() {
      this.show_input = true;
    },
    async addList() {
      await this.createList({
        name: this.list_name,
        open: false,
        rating: 0,
        ownerId: "4oFo1QKy3X8wGwuGx98h",
      })

      this.list_name = "";
      this.lists = this.getOwnedListsFromUserId("4oFo1QKy3X8wGwuGx98h"); //TODO: ユーザーのidをちゃんと引っ張ってきて入れるようにする
    }
  }
};
</script>

<style scoped>
.list {
  display: flex;
  margin: 15px 0;
}

.list-name {
  flex-grow: 1;
}

.new-list-btn {
  display: flex;
  cursor: pointer;
}

#list-name-input {
  flex-basis: 80%;
}

.new-list-btn > div {
  margin-left: 20px;
}

.none {
  display: none;
}

.new-list-wrap {
  display: flex;
  justify-content: space-between;
}
</style>