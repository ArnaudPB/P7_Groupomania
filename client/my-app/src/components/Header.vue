<template>
  <nav>
    <!-- Start of app toolbar -->
    <v-app-bar app color="red lighten-4" dark>
      <v-toolbar-side-icon
        @click.stop="drawer = !drawer"
        class="hidden-md-and-up"
      ></v-toolbar-side-icon>
      <v-toolbar-title class="headline text-uppercase">
        <router-link to="/">
          <v-img
            alt="Groupomania Logo"
            class="shrink mr-2"
            contain
            to="/"
            :src="require('../assets/logogroupo.png')"
            transition="scale-transition"
            width="250"
          />
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn color="red lighten-4" to="/" exact>Home</v-btn>
        <v-btn color="red lighten-4" to="/signup">Inscription</v-btn>

        <v-btn v-if="!$store.state.isLoggedIn" color="red lighten-4" to="/login"
          >Connexion</v-btn
        >
        <v-btn
          v-if="$store.state.isLoggedIn"
          v-on:click="logOut"
          color="red lighten-4"
          to="/login"
          >Déconnexion</v-btn
        >
        <v-btn color="red lighten-4" to="/signup">Profil</v-btn>
        <v-btn color="red lighten-4" to="/about">About</v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <!-- End of app toolbar -->
    <!-- Start of mobile side menu -->
    <!-- <v-navigation-drawer app v-model="drawer" left>
       Menu title -->
    <!--<v-app-bar text>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">Menu</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-app-bar>
      <v-divider></v-divider>
     Menu Links -->
    <!--<v-list>
        <v-list-tile to="/" exact>
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Home</v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/signup">
          <v-list-tile-action>
            <v-icon>account-plus</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Inscription</v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/signup">
          <v-list-tile-action>
            <v-icon>login</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Connexion</v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/signup">
          <v-list-tile-action>
            <v-icon>account-circle</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Profil</v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/about">
          <v-list-tile-action>
            <v-icon>description</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>About</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer> -->
    <!-- End of mobile side menu -->
  </nav>
</template>
<script>
  export default {
    name: 'PageHeader',
    data() {
      return {};
    },
    methods: {
      logOut: function() {
        this.$store.state.token === null,
          this.$store.state.user === null,
          this.$store.state.isLoggedIn === false;
      },
    },
  };
</script>
<style lang="scss" scoped>
  .v-btn {
    color: red !important;
  }
</style>