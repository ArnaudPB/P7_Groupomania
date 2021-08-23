<template>
  <v-container fluid class="signup-container ">
    <v-layout row class="signup-box">
      <v-col lg="4" md="5" sm="7">
        <v-card class="signup-card" color="text2" elevation="4" xs6>
          <v-card-title flat dense dark>
            <h1 class="font-weight-regular titre">Inscription</h1></v-card-title
          >
          <v-card-text class="font-weight-light">
            <v-form v-model="isValid" autocomplete="off">
              <v-text-field
                label="pseudo"
                v-model="pseudo"
                type="text"
                :rules="[(v) => !!v || 'Pseudo is required']"
                required
                class="input-group--focused"
              ></v-text-field>
              <v-text-field
                label="email"
                v-model="email"
                type="email"
                :rules="emailRules"
                required
                class="input-group--focused"
                autocomplete="off"
              ></v-text-field>
              <v-text-field
                label="mot de passe"
                v-model="password"
                type="password"
                :rules="[(v) => !!v || 'Password is required']"
                required
                class="input-group--focused"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <div class="danger-alert message" v-html="errorMessage" />
          <div class="danger-alert message" v-html="message"></div>

          <v-card-actions class=" d-flex justify-center">
            <v-btn
              elevation="2"
              :disabled="!isValid"
              v-on:click.prevent="signup"
              >Envoyer</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-layout>
  </v-container>
</template>

<script>
import Auth from "../services/Auth.js";
export default {
  name: "Signup",
  data() {
    return {
      pseudo: "",
      email: "",
      password: "",
      errorMessage: null,
      message: null,
      isValid: true,
      hasSignedUp: false,
      emailRules: [
        (v) => !!v || "L'email est obligatoire",
        (v) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "L'email doit être valide",
      ],
      pseudoRules: [
        (v) => v.length <= 30 || "Entre 3 et 30 caractères, sans symboles",
      ],
      passwordRules: [
        (v) =>
          v.length <= 30 ||
          "Le mot de passe doit être de 8 lettres minimum, majuscules et minucules, pas de symboles",
      ],
    };
  },
  methods: {
    async signup() {
      try {
        const response = await Auth.signup({
          pseudo: this.pseudo,
          email: this.email,
          password: this.password,
        });
        this.message = response.data.message;
        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.user);
        this.$store.dispatch("getUserById", response.data.user.id);
        let router = this.$router;
        setTimeout(function() {
          router.push("/posts");
        }, 1500);
      } catch (error) {
        this.errorMessage = error.response.data.error;
        setTimeout(() => {
          this.errorMessage = "";
        }, 1500);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style></style>