<template>
  <div class='row'>
    <div class="col-8">
      <div id='view-wrap'>
        <div id='go' class='btn' @click='go'>進む</div>
        <div id='view'></div>
        <div id='back' class='btn' @click='back'>戻る</div>
      </div>
    </div>
    <div class="col-4">
      <AgoraMain></AgoraMain>
    </div>
    <FrameSaveModal :frame_src='selected_frame' ref='modal'></FrameSaveModal>
  </div>
</template>

<script>
import Viewer from "../viewer/viewer";
import FrameSaveModal from "./FrameSaveModal";
import AgoraMain from "./shared/AgoraMain";

export default {
  name: "ViewerPage",
  components: { FrameSaveModal, AgoraMain },
  data() {
    return {
      viewer: {},
      selected_frame: "",
    };
  },
  mounted() {
    this.viewer = new Viewer({
      xml_src: "/static/books/test.xml",
      listClick: this.listClick,
      agoraClick: this.agoraClick,
      canvas_width: 400,
      canvas_height: 600,
    });

    this.viewer.show();
  },
  methods: {
    go() {
      this.viewer.go();
    },
    back() {
      this.viewer.back();
    },
    listClick(e) {
      this.selected_frame = e.currentTarget.parentElement.getAttribute(
        "frame_src"
      );
      this.$refs.modal.show();
    },
    agoraClick() {
      alert("agoraClick!!!");
    },
  },
};
</script>

<style scoped>
#view-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
}

#view {
  background-color: gray;
  position: relative;
}

.btn {
  padding: 20px;
  color: white;
}

.frame {
  background-color: white;
  background-size: contain;
  background-repeat: no-repeat;
  position: absolute;
}
</style>
