<template>
  <v-container fluid class="signup-container">
    <v-img
      :src="require('../assets/teamjump.jpg')"
      class="my-3 team-img hidden-sm-and-down"
    />
    <v-layout row class="account-box">
     <v-col lg="6" md="8" p="10" class="mx-auto">
        <v-card class="account-card" elevation="4" xs8>
          <div class="profil-top">
            <div class="profil-top__one ">
              <v-card-title flat dense dark
                >Bienvenue sur ton profil
              </v-card-title>
            </div>
            <div class="profil-middle">
              <v-card-title flat dense dark class="profil-middle__left"
                >Salut {{ pseudo }} !
              </v-card-title>

              <v-card-title flat dense dark class="profil-middle__right">
                <v-avatar size="96px">
                  <v-icon>{{ mdiAccountCircle }}</v-icon>
                </v-avatar></v-card-title
              >
            </div>
            <v-card-text
              v-if="bio"
              class="font-weight-light d-flex flex-column"
            >
              <body-1>Ta bio:</body-1>
              <body-1>{{ bio }}</body-1>
              <br />
              <v-divider ml-5></v-divider>
              <br />
            </v-card-text>
          </div>


          <v-card-text class="font-weight-light">
            <v-form v-model="isValid" autocomplete="off">
              <v-text-field
                label="Nouveau pseudo"
                v-model="newPseudo"
                type="text"
                :rules="[v => !!v || 'Pseudo is required']"
                required
                class="input-group--focused"
              ></v-text-field>
              <v-textarea
                v-if="!bio"
                outlined
                name="input-7-4"
                label="Ta bio"
              ></v-textarea>
              <form
                action="/profile"
                method="post"
                enctype="multipart/form-data"
              >
                <input type="file" name="avatar" label="ta photo" />
              </form>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-layout>
  </v-container>
</template>

<script>
// import axios from 'axios';
import { mdiAccountCircle } from "@mdi/js";
export default {
  name: "Account",
  data() {
    return {
      mdiAccountCircle,
      pseudo: this.$store.state.user.pseudo,
      bio: this.$store.state.user.bio,
      photo: "",
      isValid: true,
      newPseudo: ""
    };
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.v-avatar {
  margin-top: -20px;
}
.profil-top {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 150px;
  &__one {
    display: flex;
    justify-content: center;
  }
}
.profil-middle {
  display: flex;
  justify-content: space-between;
  height: 80px;
}
.account-box {
  position: relative;
  justify-content: center;
  margin-top: 100px;
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