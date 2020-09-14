<template>
  <div>
    <TitleBox title="メインページ" />
    <CreateList />
  </div>
</template>
<script>
import TitleBox from "./shared/TitleBox.vue";
import CreateList from "./shared/CreateList.vue";

export default {
  components: {
    TitleBox,
    CreateList
  },
};
</script>
<style scoped></style>
