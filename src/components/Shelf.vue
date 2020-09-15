<template>
  <div class="shelf">
    <TitleBox>
      <h1 class="mx-auto my-auto">あなたの本棚</h1>
    </TitleBox>
    <img src="/static/covers/鬼滅の刃カバー1.jpg" class="card-img-top" /><!--表示された-->
    <img :src="sampleFilePath" class="card-img-top" /><!--表示された-->

    <ContentsBox> </ContentsBox>
  </div>
</template>
<script>
import ContentsBox from "./shared/ContentsBox.vue";
import TitleBox from "./shared/TitleBox.vue";
export default {
  data(){
    return{ 
      sampleFilePath: "/static/covers/鬼滅の刃カバー1.jpg"
    }
  },
  components: {
    TitleBox,
    ContentsBox
  }
};
</script>
<style scoped></style>
