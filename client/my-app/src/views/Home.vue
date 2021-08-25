<template>
  <v-container class="home-container">
    <v-row class="text-center bandeau">
      <v-col cols="12">
      </v-col>

      <v-col class="mb-4 px-5">
        <h1 class="display-1 font-weight-bold mb-5">
          Bienvenue sur le social network de Groupomania !
        </h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Home",
  methods: {
    logOut: function() {
      this.$store.dispatch("logOut");
    },
  },
};
</script>
<style lang="scss" scoped>
.home-container {
   background-image: url("../assets/Newyork.jpeg");

  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}
.bandeau {
  background-color: white;
}
</style>
