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
      <v-card-text v-if="options" class="d-flex justify-center my-3">
        <div class="bloc-statut mr-5">
        <v-btn @click="toggleText" class="mx-2" dark large color="grey">
          Statut
        </v-btn>
        <v-icon large color="white" >
          mdi-plus
        </v-icon> 
        </div>

        <div class="bloc-option">
          <v-btn @click="toggleLink" class="mx-2 mb-2" dark large color="grey">
            Lien
          </v-btn>

          <v-btn @click="toggleImage" class="mx-2" dark large color="grey">
            Image
          </v-btn>
        </div>
      </v-card-text>
      <div v-if="withImage">
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
          <br />
          <br />
          <div class="danger-alert" v-html="errorMessage" />
          <div class="danger-alert" v-html="messageRetour" />
        </v-form>
      </div>
      <div v-if="withLink">
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
          >
          </v-textarea>
          <v-text-field
            name="input-1-3"
            filled
            label="link"
            v-model="link"
            auto-grow
          >
          </v-text-field>

          <v-btn @click="onSubmit" :disabled="!isValid">Poster</v-btn>
          <br />
          <br />
          <div class="danger-alert" v-html="errorMessage" />
          <div class="danger-alert" v-html="messageRetour" />
        </v-form>
      </div>

      <div v-if="withText">
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

          <v-btn @click="onSubmit" :disabled="!isValid">Poster</v-btn>
          <br />
          <br />
          <div class="danger-alert" v-html="errorMessage" />
          <div class="danger-alert" v-html="messageRetour" />
        </v-form>
      </div>
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
      options: true,
      withLink: false,
      withImage: false,
      withText: false,
      rules: {
        required: value => !!value || "Required."
      },
    message: "",
      link: null,
      
      file: "",
      messageRetour: null,
      errorMessage: null
    };
  },
  methods: {
    toggleLink() {
      (this.withLink = true), (this.options = false);
    },
    toggleImage() {
      (this.withImage = true), (this.options = false);
    },
    toggleText() {
      (this.withText = true), (this.options = false);
    },
    uploadImage() {
      const file = this.$refs.file.files[0];
      this.file = file;
      console.log(this.file)
    },
async onSubmit() {
      const formData = new FormData();
      console.log(typeof(this.message))
      formData.append("message", this.message);
       if (this.link !== null) {
        formData.append("link", this.link);
      }
      if (this.imageUrl !== null) {
        formData.append("imageUrl", this.file);
      }
      //formData.append("userId", this.userId);
      try {
        const response = await axios.post(
          "http://localhost:3000/api/posts/add",
          formData,
          {headers: { Authorization: this.$store.state.token } }
        );
        this.messageRetour = response.data.messageRetour;

        console.log(response);

         let router = this.$router;
        setTimeout(function() {
          router.push("/posts");
        }, 2000);
      } catch (error) {
        this.errorMessage = error.response.data.error;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.title-input {
  width: 500px !important;
}
//statut
.bloc-statut {
  display: flex;
  align-items: center;
  
  
}
// lien ou image
.bloc-option {
  display: flex;
  flex-direction: column;
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