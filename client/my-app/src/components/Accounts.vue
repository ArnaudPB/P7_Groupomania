<template>
  <v-container fluid class="signup-container">
    <div class="account"> 

      <v-layout v-if="$store.state.users" row class="account-box">
        <v-card
          v-for="user of users"
          :key="user.id"
          :user="user"
          class="users"
          elevation="3"
        >
          <div class="d-flex justify-space-between">
            <v-card-title flat dense dark>
              <v-avatar size="42px" class="mt-3">
                <img
                  v-if="user.photo"
                  :src="user.photo"
                  alt="Photo de profil"
                />
                <v-icon
                  role="avatar"
                  v-else-if="
                    (user.photo === null) & ($store.state.user.id === user.id)
                  "
                  color="pink"
                  size="42"
                  >$vuetify.icons.account</v-icon
                >
                <v-icon role="avatar" v-else size="42"
                  >$vuetify.icons.account</v-icon
                >
              </v-avatar>
              <div class="d-flex flex-column">
                <div>
                  <strong class="pseudo">Pseudo : </strong
                  ><span>{{ user.pseudo }}</span>
                </div>
                <div>
                  <strong>Email : </strong><span>{{ user.email }}</span>
                </div>
              </div>
            </v-card-title>
            <div>
            
              <v-tooltip
                v-if="
                  ($store.state.user.id === user.id) ||
                    ($store.state.user.admin === true)
                "
                bottom
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    class="delete-btn"
                    @click="deleteAccount(user.id)"
                    fab
                    primary
                    x-small
                    v-bind="attrs"
                    v-on="on"
                    aria-label="supprimer le compte"
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
        </v-card>
      </v-layout>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "Account",
  data() {
    return {      
    };
  },
  computed: {
    users() {
      return this.$store.getters.users;
    }    
  },
  beforeMount() {
    this.$store.dispatch("getUsers");
  },
  methods: {
    getBackHome() {
      this.$router.push("/");
    },
    logOut() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
    },
    deleteAccount(id) {     
      if(this.$store.state.user.admin === true) {
        this.$store.dispatch("deleteAccount", id);
      }
      else {
        this.$store.dispatch("deleteAccount", id);
        this.$store.dispatch("logOut");
        this.getBackHome();
      }
    },
   
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.v-avatar {
  margin-right: 1em;
}
.account {
  width: 80%;
}
.delete-btn {
  position: absolute;
  right: 10px;
  top: 10px;
}
.dialog {
  margin-top: 60px !important;
  padding-left: 30px;
}
.account-box {
  justify-content: center;
  flex-direction: row-reverse;
  margin-top: 3em;
  margin-bottom: 3em;
}
.users {
  margin-right: 2em;
  margin-top: 2em;
  width: 370px;
  height: 120px;
  position: relative;
}
</style>