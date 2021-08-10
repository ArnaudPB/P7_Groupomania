<template>
  <v-container fluid>
    <v-card class="mx-auto post-card" color="red lighten-4" max-width="600">
      <v-card-title class="post-title-box">
        <v-icon large color="white" left>
          {{ mdiMessageSettingsOutline }}
        </v-icon>
        <div>
          <span class="title font-weight-light post-title"
            >Que partagez-vous aujourd'hui ?</span
          >
        </div>
      </v-card-title>
      <v-textarea
        class="title-input ml-4"
        label="Titre"
        rows="1"
        v-model="title"
      ></v-textarea>
      <v-textarea
        name="input-1-3"
        filled
        label="Message"
        v-model="message"
        auto-grow
      ></v-textarea>
      <v-file-input
        accept="image/png, image/jpeg, image/bmp"
        placeholder="Upload ton image ou gif"
        prepend-icon="mdi-camera"
        label="Fichier"
      ></v-file-input>
    </v-card>
  </v-container>
</template>
<script>
  import { mdiMessageSettingsOutline } from '@mdi/js';
  export default {
    name: 'NewPost',
    data() {
      return {
        mdiMessageSettingsOutline,
        title: '',
        message: '',
        url: '',
        user_id: this.$store.state.user.id,
      };
    },
  };
</script>
<style lang="scss" scoped>
  .title-input {
    width: 500px !important;
  }
  .post-title-box {
    background-color: gray;
    .post-title {
      color: white;
      font-weight: 600 !important;
    }
  }
  .post-card {
    margin-top: 8rem;
  }
</style>