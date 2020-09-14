<template>
  <div class='row title-box mx-auto mt-3'>
    <h2 class='mx-auto my-3'>{{ this.title }}</h2>
    <slot name='button'></slot>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  name: "TitleBox",
};
</script>
<style scoped>
.title-box {
  background-color: #656565;
}
</style>
