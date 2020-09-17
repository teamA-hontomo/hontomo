<template>
  <div class='row contents-box mx-auto mt-3'>
    <slot></slot>
  </div>
</template>
<script>
import ModalWindow from "./ModalWindow.vue";
export default {
  name: "ContentsBox",
};
</script>
<style scoped>
.contents-box {
  background-color: #656565;
  padding: 25px;
}
</style>
