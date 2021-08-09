<template>
  <v-container>
    <v-layout row class="signup-box">
      <v-col lg="5" md="6" sm="6" ml-5>
        <v-card elevation="2" outlined shaped tile xs6>
          <v-card-title flat dense dark>Inscription</v-card-title>
          <v-card-text class="font-weight-light">
            <v-form v-model="isValid">
              <v-text-field
                label="pseudo"
                v-model="pseudo"
                type="text"
                :rules="[(v) => !!v || 'Pseudo is required']"
                required
                placeholder=" pseudo"
              >
              </v-text-field>
              <v-text-field
                label="email"
                v-model="email"
                type="email"
                :rules="[(v) => !!v || 'Email is required']"
                required
                placeholder=" email"
              >
              </v-text-field>
              <v-text-field
                label="inputPassword"
                v-model="password"
                type="password"
                :rules="[(v) => !!v || 'Password is required']"
                required
                placeholder="mot de passe"
              >
              </v-text-field>

              <br />
              <input />
              <br />
              <input />
              <br />
              <div class="danger-alert" v-html="errorMessage" />
              <br />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn
              class="indigo"
              elevation="2"
              :disabled="!isValid"
              v-on:click.prevent="signup"
              >Envoyer
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-layout>
  </v-container>
</template>

<script>
import Auth from "../services/Auth.js"; // Importing Axios
export default {
  name: "Signup",
  data() {
    return {
      pseudo: "",
      email: "",
      password: "",
      errorMessage: null,
      isValid: true,
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
        console.log(response.data);
      } catch (error) {
        this.errorMessage = error.response.data.error;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.signup-box {
  justify-content: center;
  align-items: center;
}
</style>
