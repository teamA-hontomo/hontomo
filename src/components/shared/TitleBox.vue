<template>
  <div class='row title-box mx-auto mt-3'>
    <slot></slot>
    <slot name='button'></slot>
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
}
</style>
