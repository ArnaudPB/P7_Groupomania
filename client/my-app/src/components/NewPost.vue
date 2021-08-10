<template>
  <v-container fluid class="post-box">
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
       <v-form
        v-model="isValid"
        @submit.prevent="onSubmit"
        enctype="multipart/form-data"
        class="validate"
      >
        <v-textarea
          name="input-1-3"
          filled
          label="Message"
          v-model="message"
          :rules="[rules.required]"
          auto-grow
        ></v-textarea>
        <v-text-field
          name="input-1-3"
          filled
          label="link"
          v-model="link"
          auto-grow
        ></v-text-field>
        <div>
          <label for="image">Image</label>
          <input
            @change="uploadImage"
            type="file"
            accept="image/png, image/jpeg,
        image/bmp, image/gif"
            ref="file"
            name="image"
          />
        </div>
        <v-btn @click="onSubmit" :disabled="!isValid">Poster</v-btn>
        <div class="message">{{ messageRetour }}</div>
      </v-form>
    </v-card>
  </v-container>
</template>
<script>
import { mdiMessageSettingsOutline } from "@mdi/js";
//import PostService from "../services/PostService";
import axios from "axios";
export default {
  name: "NewPost",
  data() {
    return {
      mdiMessageSettingsOutline,
      isValid: true,
      rules: {
        required: value => !!value || "Required."
      },
    message: "",
      link: null,
      //userId: this.$store.state.user.id,
      file: "",
      messageRetour: ""
    };
  },
  methods: {
    uploadImage() {
      const file = this.$refs.file.files[0];
      this.file = file;
    },
async onSubmit() {
      const formData = new FormData();
      formData.append("message", this.message);
      formData.append("link", this.link);
      formData.append("imageUrl", this.file);
      //formData.append("userId", this.userId);
      try {
        const response = await axios.post(
          "http://localhost:3000/api/posts/add",
          formData,
          {
            headers: {
              Authorization: this.$store.state.token
            }
          }
        );
        console.log(response);
        //this.messageRetour = response.data.message;
      } catch (error) {
        //this.errorMessage = error.response.data.error;
      }
    }
  }
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
.post-box {
  height: 100%;
  padding-bottom: 10rem;
}
</style>