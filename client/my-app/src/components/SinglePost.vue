<template >
  <v-container fluid class="bloc-modal">
    <div class="overlay "></div>
    <div v-if="post.data.imageUrl" class="modal-card ">
      <v-card class="mx-auto post-card" color="red lighten-4" max-width="600">
        <v-card-title class="post-title-box">
          <v-icon medium color="white" left>
            {{ mdiMessageSettingsOutline }}
          </v-icon>

          <div class="update-title pl-3 pb-5">
            <span class="title font-weight-light post-title "
              >Modifiez votre post</span
            >
            <v-icon
              @click="getBackToFeed"
              class=" rounded-circle cancel-update"
              >{{ mdiCloseThick }}</v-icon
            >
          </div>
        </v-card-title>
        <v-form
          v-model="isValid"
          @submit.prevent="onSubmit"
          enctype="multipart/form-data"
          class="validate "
        >
          <div class="text-box">
            <v-textarea
              v-if="textInput"
              name="input-1-2"
              filled
              label="Message"
              v-model="message"
              :rules="[rules.required]"
              auto-grow
              clearable: true
              class="mr-5 ml-3"
            ></v-textarea>
            <span v-else class="pl-5">{{ post.data.message }} </span>
            <v-icon @click="newText" class=" rounded-circle cancel-update">{{
              mdiCloseThick
            }}</v-icon>
          </div>

          <div class="link-box pb-5 pt-5">
            <v-text-field
              v-if="linkInput"
              name="input-1-3"
              filled
              label="link"
              v-model="link"
              auto-grow
              class="mr-5 ml-3"
            ></v-text-field>           

          </div>
          <v-img           
            :src="post.data.imageUrl"
            :max-height="300"
            :max-width="200"
            class="mx-auto pb-5"
          ></v-img>
          <div class="pb-5 pt-5">
            <label for="image" class="pl-5">Image</label>
            <input
              @change="uploadImage"
              type="file"
              accept="image/png, image/jpeg,
        image/bmp, image/gif"
              ref="file"
              name="image"
            />
          </div>
          <div class="pl-5 pt-5">
            <v-btn @click="onSubmit" :disabled="!isValid">Poster</v-btn>
          </div>

          <br />
          <div class="danger-alert" v-html="errorMessage" />
          <div class="danger-alert" v-html="messageRetour" />
        </v-form>
      </v-card>
    </div>
    <div v-if="post.data.link" class="modal-card ">
      <v-card class="mx-auto post-card" color="red lighten-4" max-width="600">
        <v-card-title class="post-title-box">
          <v-icon medium color="white" left>
            {{ mdiMessageSettingsOutline }}
          </v-icon>
          <div class="update-title pl-3 pb-5 ">
            <span class="title font-weight-light post-title ">Votre post</span>            
            <v-btn  @click="getBackToFeed" class="mx-2 return-btn" dark small  color="grey" > Retour  </v-btn>
          </div>
        </v-card-title>
        <v-card-text>
           <span class="pl-5">{{ post.data.message }} </span>
            <v-img        
            :src="post.data.link"
            :max-height="300"
            :max-width="200"
            class="mx-auto pb-5"
          ></v-img>
        </v-card-text>
        <v-form
          v-model="isValid"
          @submit.prevent="onSubmit"
          enctype="multipart/form-data"
          class="validate "
        >
          <div class="text-box">
            <v-textarea
              v-if="textInput"
              name="input-1-2"
              filled
              label="Message"
              v-model="message"
              :rules="[rules.required]"
              auto-grow
              class="mr-5 ml-3"
            ></v-textarea>

            <v-icon @click="newText" class=" rounded-circle cancel-update">{{
              mdiCloseThick
            }}</v-icon>
          </div>

          <div class="link-box pb-5 pt-5">
            <v-text-field
              v-if="linkInput"
              name="input-1-3"
              filled
              label="link"
              v-model="link"
              auto-grow
              class="mr-5 ml-3"
            ></v-text-field>

            <v-icon @click="newLink" class=" rounded-circle cancel-update">{{
              mdiCloseThick
            }}</v-icon>
          </div>
         <div class="pb-5 pt-5">
            <label for="image" class="pl-5">Image</label>
            <input
              @change="uploadImage"
              type="file"
              accept="image/png, image/jpeg,
        image/bmp, image/gif"
              ref="file"
              name="image"
            />
          </div>
          <div class="pl-5 pt-5">
          <v-btn @click="onSubmit" :disabled="!isValid">Poster</v-btn>
          </div>

          
          <br />
          <div class="danger-alert" v-html="errorMessage" />
          <div class="danger-alert" v-html="messageRetour" />
        </v-form>
      </v-card>
    </div>
  </v-container>
</template>
<script>
//import PostService from "../services/PostService";
import axios from "axios";
import { mdiCloseThick } from "@mdi/js";
import { mdiMessageSettingsOutline } from "@mdi/js";
import PostService from "../services/PostService";
export default {
  name: "SinglePost",
  data() {
    return {
      post: "",

      mdiCloseThick,
      mdiMessageSettingsOutline,
      isValid: true,
      rules: {
        required: value => !!value || "Required."
      },
      message: "null",
      link: null,
      file: "",
      messageRetour: null,
      errorMessage: null,
      linkInput: false,
      textInput: false
    };
  },
  async mounted() {
    try {
      const id = this.$route.params.id;
      console.log(id);
      this.post = await PostService.getPostById(id);
      console.log(this.post);
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    uploadImage() {
      const file = this.$refs.file.files[0];
      this.file = file;
    },
    async onSubmit() {
      const formData = new FormData();
      if (this.message !== null) {
        formData.append("message", this.message);
      } else {
        formData.append("message", this.post.data.message);
      }
      if (this.link !== null) {
        formData.append("link", this.link);
      }
      formData.append("imageUrl", this.file);
      //formData.append("userId", this.userId);
      console.log(this.message)


      try {
        const response = await axios.put(
          `http://localhost:3000/api/posts/ ${this.$route.params.id}`,
          formData,
          { headers: { Authorization: this.$store.state.token } }
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
    },
    getBackToFeed() {
      this.$router.push("/posts");
    },
    newLink() {
      this.linkInput = true;
    },
    newText() {
      this.textInput = true;
    }
  }
};
</script>
<style lang="scss" scoped>
.post-title {
  position: relative;
}
.return-btn {
  position: absolute;
  right: 0;
}
.text-box {
  display: flex;
  align-content: center;
}
.link-box {
  display: flex;
  align-content: center;
}
</style>