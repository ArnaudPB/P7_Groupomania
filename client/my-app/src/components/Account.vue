<template>
  <v-container fluid class="signup-container">
    <v-layout v-if="$store.state.isLoggedIn" row class="account-box mb-5">
      <v-col lg="4" md="6" sm="7" class="mx-auto">
        <v-card class="account-card d-flex flex-column" elevation="4" xs6>
          <div class="profil-top pb-3 ">
            <v-btn to="/posts" class="mx-2 return-btn" x-small>
              Retour
            </v-btn>
            <v-card-title flat dense dark class="profil-title mr-3"
              ><h1 class="titre">Modifier le profil</h1>
            </v-card-title>
            <div class="delete-account">
              <v-tooltip v-if="!$store.state.user.admin === true" bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    @click="deleteAccount(user.id)"
                    class="mx-2"
                    fab
                    x-small
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon small class=" rounded-circle ">
                      $vuetify.icons.delete
                    </v-icon>
                  </v-btn>
                </template>
                <span>Supprimer le compte</span>
              </v-tooltip>
            </div>
          </div>
          <v-divider></v-divider>
          <div class="profil-middle mt-3 ">
            <v-card-title
              v-if="showPseudo"
              dark
              class=" profil-middle__left d-flex justify-space-between"
            >
              <span class="pseudo"> Salut {{ user.pseudo }} ! </span>
              <v-btn @click="togglePseudo" x-small>
                Modifier
              </v-btn>
            </v-card-title>
            <v-text-field
              v-if="updatePseudo"
              label="Nouveau pseudo"
              v-model="newPseudo"
              :rules="pseudoRules"
              required
              counter="30"
              hint="Le pseudo doit avoir 3 caractères min et 30 max"
              class="input-group--focused  mx-3"
            ></v-text-field>

            <v-divider></v-divider>
            <v-card-title
              v-if="showPhoto"
              class="profil-middle__right d-flex  flex-column"
            >
              <v-avatar size="96px" class="mt-2">
                <img
                  rounded
                  v-if="user.photo"
                  :src="user.photo"
                  alt="Photo de profil"
                />
                <v-icon
                  :color="isLoggedIn"
                  size="96px"
                  aria-label="avatar"
                  v-else
                  >$vuetify.icons.account</v-icon
                >
              </v-avatar>
              <v-btn @click="togglePhoto" class="mx-2" x-small>
                Changer
              </v-btn>
            </v-card-title>

            <div v-if="updatePhoto" class="d-flex justify-center">
              <label for="image" class="mr-3">Photo</label>
              <input
                @change="uploadImage"
                type="file"
                accept="image/png, image/jpeg,
                    image/bmp, image/gif"
                ref="file"
                name="image"
                class="input-group--focused"
              />
            </div>
          </div>
          <v-divider></v-divider>
          <v-card-text v-if="showBio" class=" bio">
            <div
              class="d-flex flex-column justify-space-between"
              max-width="70%"
            >
              <strong>Ta bio: </strong>
              <div>
                <span v-if="!user.bio"> Parle nous de toi 😊</span>
                <span class="bio-field">{{ user.bio }}</span>
              </div>
            </div>
            <v-btn @click="toggleBio" class="mx-2 mt-2 mr-n6" x-small>
              Modifier
            </v-btn>
          </v-card-text>
          <v-textarea
            v-if="updateBio"
            label="Bio"
            v-model="newBio"
            :rules="bioRules"
            solo
            name="input-7-4"
            class="input-group--focused bio"
          >
          </v-textarea>
          <div>
            <v-card-text v-if="options" class="font-weight-light">
              <br />
              <div class="danger-alert" v-html="errorMessage" />
              <div class="danger-alert" v-html="messageRetour" />

              <div class="d-flex justify-center">
                <v-btn @click="onSubmit(user.id)" :disabled="!isValid"
                  >Envoyer</v-btn
                >
              </div>
            </v-card-text>
          </div>
        </v-card>
      </v-col>
    </v-layout>
    <v-card v-else>
      <v-card-title class="post-title-box">
        <div class=" d-flex flex-column update-title pl-3 pb-5 ">
          <span class="title font-weight-light post-title pb-5 "
            >Votre compte a été supprimé</span
          >
        </div>
      </v-card-title>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Account",
  data() {
    return {
      updateBio: false,
      updatePseudo: false,
      updatePhoto: false,
      showPseudo: true,
      showPhoto: true,
      showBio: true,
      isValid: true,
      options: false,
      newPseudo: "",
      newBio: "",
      pseudoRules: [
        (v) => v.length <= 30 || "Max 30 caractères",
        (v) => !!v || "Le pseudo est obligatoire",
      ],
      bioRules: [(v) => v.length <= 400 || "Max 400 caractères"],
      file: "",
      messageRetour: null,
      errorMessage: null,
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    isLoggedIn() {
      if (this.$store.state.isLoggedIn) {
        return "pink";
      } else {
        return "";
      }
    },
  },
  beforeMount() {
    this.$store.dispatch("getUserById");
  },
  methods: {
    getBackHome() {
      this.$router.push("/");
    },
    togglePseudo() {
      this.updatePseudo = true;
      this.showPseudo = false;
      this.options = true;
    },
    togglePhoto() {
      this.updatePhoto = true;
      this.showImage = false;
      this.options = true;
      this.showPhoto = false;
    },
    toggleBio() {
      this.updateBio = true;
      this.showBio = false;
      this.options = true;
    },
    uploadImage() {
      const file = this.$refs.file.files[0];
      this.file = file;
      console.log(this.file);
    },
    onSubmit() {
      const formData = new FormData();
      formData.append("pseudo", this.newPseudo);
      formData.append("bio", this.newBio);
      if (this.file !== null) {
        formData.append("image", this.file);
      }
      this.$store.dispatch("getUsers");
      this.$store.dispatch("getUserById", this.user.id);
      this.$store.dispatch("updateAccount", formData);
      this.$store.dispatch("getUserById", this.user.id);
      this.updateBio = false;
      this.updatePhoto = false;
      this.updatePseudo = false;
      this.options = false;
      this.showBio = true;
      this.showPhoto = true;
      this.showPseudo = true;
    },
    deleteAccount(id) {
      this.$store.dispatch("deleteAccount", id);
      this.$store.dispatch("logOut");
      setTimeout(() => {
        this.getBackHome();
      }, 2000);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.v-avatar {
  margin-top: -30px;
  margin-right: 1em;
}
.account-card {
  display: flex;
  justify-content: space-around;
  margin-top: 2em;
  margin-bottom: 4em;
}
.profil-top {
  display: flex;
  justify-content: space-between;
  padding-top: 1em;
}
.profil-middle {
  width: 100%;
  margin: auto !important;
}
.profil-title {
  padding: 0;
}
</style>