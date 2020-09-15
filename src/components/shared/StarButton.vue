<template>
  <div class="my-auto">
    <font-awesome-icon
      icon="star"
      class="fa-lg"
      v-on:click="onClickStar"
      v-bind:class="{yellowStar: isFollowed}"
    />
    <span>{{ rating }}</span>
  </div>
</template>

<script>
export default {
  name: "StarButton",
  props: ["listId", "userId"],

  data() {
    return {
      rating: 5,
      isFollowed: false,
    };
  },

  methods: {
    onClickStar: function () {
      if (this.isFollowed) {
        this.isFollowed = false;
        this.rating--;
        this.removeStarFromList(this.listId, this.userId);
      } else {
        this.isFollowed = true;
        this.rating++;
        this.addStarToList(this.listId, this.userId);
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