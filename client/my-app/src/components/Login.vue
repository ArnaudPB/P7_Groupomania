<template>
  <v-container fluid class="signup-container">
    <v-img
      :src="require('../assets/teamjump.jpg')"
      class="my-3 team-img hidden-sm-and-down"
    />
    <v-layout row class="signup-box">
      <v-col lg="5" md="6" sm="6" ml-5>
        <v-card class="signup-card" elevation="4" xs6>
          <v-card-title flat dense dark>Connexion</v-card-title>
          <v-card-text class="font-weight-light">
            <v-form v-model="isValid">
              <v-text-field
                label="email"
                v-model="email"
                type="email"
                :rules="[(v) => !!v || 'Email is required']"
                required
                class="input-group--focused"
              >
              </v-text-field>
              <v-text-field
                label="mot de passe"
                v-model="password"
                type="password"
                :rules="[(v) => !!v || 'Password is required']"
                required
                class="input-group--focused"
              >
              </v-text-field>

              <br />
              <input />
              <br />
              <input />
              <br />
              <div class="danger-alert" v-html="errorMessage" />
              <div class="danger-alert" v-html="message" />
              <br />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn
              class="dark"
              elevation="2"
              :disabled="!isValid"
              v-on:click.prevent="login"
              >Envoyer
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-layout>
  </v-container>
</template>

<script>
  // import axios from 'axios';
  import Auth from '../services/Auth.js';
  export default {
    name: 'Login',
    data() {
      return {
        email: '',
        password: '',
        errorMessage: null,
        isValid: true,
        message: null,
      };
    },
    methods: {
      async login() {
        try {
          const response = await Auth.login({
            email: this.email,
            password: this.password,
          });
          console.log(response.data);
          this.message = response.data.message;
          this.$store.dispatch('setToken', response.data.token);
          this.$store.dispatch('setUser', response.data.user);
          let router = this.$router;
          setTimeout(function() {
            router.push('/posts');
          }, 1500);
        } catch (error) {
          this.errorMessage = error.response.data.error;
        }
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .signup-container {
    //
    height: 100vh;
    margin-top: 5px;
  }
  .signup-box {
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