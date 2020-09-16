<template>
  <div class='my-auto'>
    <font-awesome-icon
      icon='star'
      class='fa-lg'
      v-on:click='onClickStar'
      v-bind:class='{yellowStar: isFollowed}'
    />
    <span>{{ rating }}</span>
  </div>
</template>

<script>
export default {
  name: "StarButton",
  props: ["list", "followed", "userId"],

  data() {
    return {
      isFollowed: false,
      rating: 0,
    };
  },

  created() {
    console.debug(this.list.rating);
    //TODO:falseかどうかをfirebaseからもってくる。

    this.rating = this.list.rating;
    this.isFollowed = this.followed;
  },

  methods: {
    onClickStar: function () {
      if (this.isFollowed) {
        this.isFollowed = false;
        this.rating--;
        this.removeStarFromList(this.list.id, this.userId);
      } else {
        this.isFollowed = true;
        this.rating++;
        this.addStarToList(this.list.id, this.userId);
      }
    },
  },

  watch: {
    list: function () {
      //console.debug("rate", this.list.rating);
      this.rating = this.list.rating;
      this.isFollowed = this.followed;
    },
  },
};
</script>

<style scoped>
.yellowStar {
  color: yellow;
}
</style>