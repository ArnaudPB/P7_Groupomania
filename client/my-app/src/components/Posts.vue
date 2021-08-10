<template>
  <div>
    <v-card class="posts-card mx-auto" elevation="2">
      <div>
        <v-card-title class="headline">{{ title }}</v-card-title>

        <v-text>{{ message }}</v-text>
        <v-text>{{ author }}</v-text>
        <v-img :src="image.source" height="250" width="350"></v-img>
      </div>
    </v-card>
  </div>
</template>
<script>
  export default {
    name: 'Posts',
    props: {
      image: {
        type: Object,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      message: {
        type: String,
      },
      author: {
        type: String,
      },
    },
    data() {
      return {};
    },
  };
</script>
<style lang="scss" scoped>
  .posts-card {
    width: 40em;
  }
  .posts-row {
    justify-content: center;
  }
</style>