<template>
  <div class="my-auto">
    <font-awesome-icon
      icon="star"
      class="fa-lg"
      v-on:click="onClickStar"
      v-bind:class="{yellowStar: !isfollowed}"
    />
    <span>{{ rating }}</span>
  </div>
</template>

<script>
export default {
  name: "StarButton",

  data() {
    return {
      rating: 5,
      iffollowed: false,
    };
  },

  methods: {
    onClickStar: function () {
      if (this.isfollowed) {
        this.isfollowed = false;
        this.rating--;
      } else {
        this.isfollowed = true;
        this.rating++;
      }
    },
  },
};
</script>

<style scoped>
.yellowStar {
  color: yellow;
}
</style>