<template>
  <div class="row">
    <div class="col" :class="{'col-8':showAgora}" style="margin-top:3em;">
      <div id="view-wrap">
        <div id="go" class="btn" @click="go">
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            class="bi bi-chevron-left"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
            />
          </svg>
        </div>
        <div id="view"></div>
        <div id="back" class="btn" @click="back">
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            class="bi bi-chevron-right"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </div>
      </div>
    </div>
    <div class="col-4" v-show="showAgora">
      <AgoraMain @fromAgora="closeAgora" :frameId="selected_frame"></AgoraMain>
    </div>
    <FrameSaveModal :frame_src="selected_frame" :frame_page="selected_page" ref="modal"></FrameSaveModal>
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
      selected_page: "",
      showAgora: false
    };
  },
  mounted() {
    this.viewer = new Viewer({
      xml_src: "/static/books/bj.xml",
      listClick: this.listClick,
      agoraClick: this.agoraClick,
      canvas_width: 500,
      canvas_height: 700
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
      const p_elm = e.currentTarget.parentElement;
      this.selected_frame = p_elm.getAttribute('frame_src');
      this.selected_page = p_elm.getAttribute('page')
      this.$refs.modal.show();
    },
    agoraClick(e) {
      this.selected_frame = e.currentTarget.parentElement.getAttribute(
        "frame_src"
      );
      this.showAgora = true;
    },
    closeAgora() {
      this.showAgora = false;
    },
  }
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
