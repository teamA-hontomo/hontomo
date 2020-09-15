<template>
  <div class='row contents-box mx-auto mt-3'>
    <div class='mx-auto' style="width:100%;">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "ContentsBox",
};
</script>
<style scoped>
.contents-box {
  background-color: #656565;
}
</style>
