<template>
  <div>
    <v-form
      v-model="isValid"
      @submit.prevent="onSubmit"
      enctype="multipart/form-data"
      class="validate comment-form"
    >
      <v-text-field
        name="input-1-3"
        label="ton commentaire"
        v-model="data.commentMessage"
        auto-grow
        class="comment-form__message"
      >
      </v-text-field>
      <v-btn
        @click="onSubmitComment()"
        :disabled="!isValid"
        class="comment-form__btn"
        >Poster</v-btn
      >
    </v-form>
    <div>
      <div class="danger-alert" v-html="errorMessage" />
      <div class="danger-alert" v-html="messageRetour" />
    </div>
  </div>
</template>

<script>
//import { mdiAccountCircle } from "@mdi/js";
import PostService from "../services/PostService";
import axios from "axios";
export default {
  name: "AddComment",
  data() {
    return {
      post: "",
      isValid: true,
      messageRetour: null,
      errorMessage: null,
      rules: {
        required: value => !!value || "Required."
      },
      data: {
        commentMessage: "",
        commentPseudo: this.$store.state.user.pseudo
      }
    };
  },
  async mounted() {
    try {
      const id = this.$route.params.id;
      this.post = await PostService.getPostById(id);
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    async onSubmitComment() {
      const data = this.data;
      const id = this.$route.params.id;
      try {
        const response = await axios.post(
          `http://localhost:3000/api/posts/${id}/comments`,
          data,
          { headers: { Authorization: this.$store.state.token } }
        );
        this.messageRetour = response.data.messageRetour;
        console.log(response);
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