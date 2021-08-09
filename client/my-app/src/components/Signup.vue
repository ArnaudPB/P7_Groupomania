<template>
  <div class="signup">
    <h1>Inscription</h1>
    <div class="signup-modale">
      <form action="">
        <div class="form-group ">
          <label for="pseudo">Ton pseudo</label>
          <input
            id="pseudo"
            v-model="pseudo"
            type="text"
            placeholder=" pseudo"
            class="form-control"
          />
        </div>

        <div class="form-group">
          <label for="email">Ton adresse mail</label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder=" email"
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="inputPassword">Ton mot de passe</label>
          <input
            id="inputPassword"
            v-model="password"
            type="password"
            placeholder="mot de passe"
            class="form-control"
          />
        </div>
        <div class="btn btn-primary" v-on:click.prevent="signup">
          Envoyer
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import Auth from "../services/Auth.js"; // Importing Axios
  export default {
    name: 'Signup',
    data() {
      return {
        pseudo: '',
        email: '',
        password: '',
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
          this.error = error.response.data.error;
        }
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .signup {
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .signup-modale {
    background-color: cadetblue;
    padding: 50px;
  }
</style>