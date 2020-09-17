<template>
  <div class='row title-box mx-auto mt-3'>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "TitleBox",
};
</script>
<style scoped>
.title-box {
  background-color: #656565;
  padding: 15px;
}
</style>
