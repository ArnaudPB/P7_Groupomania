<template>
  <div>
    <v-row justify="center">
      <v-menu bottom min-width="200px" rounded offset-y>
        <template v-if="$store.state.isLoggedIn" v-slot:activator="{ on }">
          <v-btn icon x-large v-on="on">
            <v-avatar size="36px">
              <!-- <img v-if="photo" alt="Avatar" :src="photo" /> -->

              <v-icon>{{ mdiAccountCircle }}</v-icon>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-avatar>
                <!-- <img v-if="$store.state.user.photo" alt="Avatar" :src="photo" /> -->
                <v-icon>{{ mdiAccountCircle }}</v-icon>
              </v-avatar>
              <h3>{{ pseudo }}</h3>
              <p class="caption mt-1">{{ email }}</p>
              <v-divider class="my-3"></v-divider>
              <v-btn rounded text to="/account">Editer profil 😎 </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn @click="logOut" rounded text>Déconnexion</v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
    </v-row>
  </div>
</template>

<script>
import { mdiAccountCircle } from "@mdi/js";
export default {
  name: "AccountPreview",
  data() {
    return {
      mdiAccountCircle,
      // photo: this.$store.state.user.photo,
      pseudo: this.$store.state.user.pseudo,
      email: this.$store.state.user.email
    };
  },
  methods: {
    logOut: function() {
      console.log(this.$store.state.user.photo);
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      this.$router.push("/");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.signup-box {
  position: relative;
  justify-content: center;
  margin-left: 200px;
}
.signup-card {
  border: 3px solid #676c75 !important;
  background-color: #ffebee !important;
}
.team-img {
  clip-path: polygon(
    0 30%,
    60% 30%,
    60% 0%,
    100% 50%,
    60% 100%,
    60% 71%,
    0 72%
  );
  width: 600px;
  height: 500px;
  position: absolute;
  top: 70px;
  left: 0;
}
</style>