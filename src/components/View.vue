<template>
  <div>
    <div id="go" @click="go">
      進む
    </div>
    <div id="view">

    </div>
    <div id="back" @click="back">
      戻る
    </div>
  </div>
</template>

<script>
import Viewer from "../viewer/viewer";

export default {
  name: "ViewerPage",
  data() {
    return {
      viewer: {}
    }
  },
  created() {
    this.viewer = new Viewer('/static/test.xml');
    // this.viewer.setDisplay('view');
    // this.viewer.show();
  },
  methods: {
    go() {
      this.viewer.go();
    },
    back() {
      this.viewer.back();
    }
  }
}
</script>

<style scoped>
  #wrap {
      background-color: #fffff3;
  }

  #view {
      width: 200px;
      height: 300px;
      background-color: gray;
      position: relative;
  }

  .frame {
      background-color: white;
      background-size: contain;
      background-repeat: no-repeat;
      position: absolute;
  }
</style>