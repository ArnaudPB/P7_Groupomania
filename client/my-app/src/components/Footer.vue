<template>
  <v-footer fixed dark class="footer">
    <v-btn x-small to="/about" class="ml-5 mt-3">Règlement</v-btn>
    <!--         <div v-if="!$store.state.isLoggedIn" class="mt-2 mr-2">
         {{ new Date().getFullYear() }} — <strong>Groupomania</strong>
        </div>
        <div v-else class="mt-2">
         {{ new Date().getFullYear() }} — <strong>Groupomania</strong>
        </div> -->
    <v-btn
      v-if="$store.state.isLoggedIn"
      class=" mt-3 mr-5"
      x-small
      @click="logOut"
      to="/"
      >Déconnexion</v-btn
    >
  </v-footer>
</template>
<script>
export default {
  name: "PageFooter",
  data: () => ({}),
  methods: {
    logOut: function() {
      this.$store.dispatch("logOut");
    },
  },
};
</script>
<style lang="scss" scoped></style>