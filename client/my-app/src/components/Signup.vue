<template>
  <v-container fluid class="signup-container">
    <v-img
      :src="require('../assets/teamjump.jpg')"
      class="my-3 team-img hidden-sm-and-down"
    />
    <v-layout row class="signup-box">
      <v-col lg="5" md="8" ml-5>
        <v-card class="signup-card" elevation="4" xs6>
          <v-card-title flat dense dark>Inscription</v-card-title>
          <v-card-text class="font-weight-light">
            <v-form v-model="isValid" autocomplete="off">
              <v-text-field
                label="pseudo"
                v-model="pseudo"
                type="text"
                :rules="[v => !!v || 'Pseudo is required']"
                required
                class="input-group--focused"
              >
              </v-text-field>
              <v-text-field
                label="email"
                v-model="email"
                type="email"
                :rules="[v => !!v || 'Email is required']"
                required
                class="input-group--focused"
                autocomplete="off"
              >
              </v-text-field>
              <v-text-field
                label="mot de passe"
                v-model="password"
                type="password"
                :rules="[v => !!v || 'Password is required']"
                required
                class="input-group--focused"
                autocomplete="off"
              >
              </v-text-field>

              <br />
              <input />
              <br />
              <input />
              <br />
              <div class="danger-alert" v-html="errorMessage" />
              <div class="danger-alert" v-html="message">
                <v-card v-show="hasSignedUp" class="mx-auto" max-width="500">
                  <v-window>
                    <v-window-item>
                      <div class="pa-4 text-center">
                        <v-img
                          class="mb-4"
                          contain
                          height="128"
                          src="https://cdn.vuetifyjs.com/images/logos/v.svg"
                        ></v-img>
                         <h3 class="title font-weight-light mb-2">
                          Welcome to Vuetify
                        </h3>
                        <span class="caption grey--text"
                          >Thanks for signing up!</span
                        >
                      </div>
                    </v-window-item>
                  </v-window>
                </v-card>
              </div>
              <br />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn
              class="dark"
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
      hasSignedUp: false
    };
  },
  methods: {
    async signup() {
      try {
        const response = await Auth.signup({
          pseudo: this.pseudo,
          email: this.email,
          password: this.password
        });
        this.message = response.data.message;
        console.log(response.data);

        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.user);
          let router = this.$router;
        setTimeout(function() {
          router.push("/posts");
        }, 1500);
      } catch (error) {
        this.errorMessage = error.response.data.error;
      }
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