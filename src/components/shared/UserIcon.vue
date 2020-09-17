<template>
  <div>
    <img :class="{author: is_author}" :src="'https://randomuser.me/api/portraits/lego/' + num + '.jpg'" alt="">
  </div>
</template>

<script>
export default {
  name: 'UserIcon',
  props: {
    num: "",
    is_author: false
  },
};
</script>

<style scoped>
  img {
    width: 100px;
    height: 100px;
    border-radius: 50px;
  }

  .author {
    border: 4px solid #AF3D3D;
  }
</style>