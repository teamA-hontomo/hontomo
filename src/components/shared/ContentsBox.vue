<template>
  <div class='row contents-box mx-auto mt-3'>
    <div class='mx-auto'>
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
