<template>
  <div id="view-wrap">
    <div id="go" class="btn" @click="go">
      進む
    </div>
    <div id="view">

    </div>
    <div id="back" class="btn" @click="back">
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
  mounted() {
    this.viewer = new Viewer('/static/books/test.xml');

    this.viewer.show();
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
  #view-wrap {
    display: flex;
    align-items: center;
  }

  #view {
      width: 200px;
      height: 300px;
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