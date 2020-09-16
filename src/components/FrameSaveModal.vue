<template>
  <div>
    <b-modal id="modal" hide-footer centered title="保存先">
      <div class="lists">
        <div class="list" v-for="list in lists" :key="list.id">
          <div class="list-name">{{ list.name }}</div>
          <b-button pill v-on:click="saveFrame(list.id)">保存</b-button>
        </div>
      </div>
      <div>新しいリストを作成</div>
    </b-modal>
  </div>
</template>

<script scoped>
import { BModal, BButton, VBModal, ModalPlugin } from "bootstrap-vue";

export default {
  name: "FrameSaveModal",
  data() {
    return {
      lists: []
    };
  },
  props: ['frame_src'],
  components: { "b-modal": BModal, "b-button": BButton, ModalPlugin },
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
</style>