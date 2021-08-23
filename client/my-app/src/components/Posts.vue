<template>
  <div>
    <v-card class="posts-card mx-auto mt-4 mb-4 pb-5" round elevation="2">
      <div>
        <div class="d-flex justify-space-between pr-2 ">
          <v-card-title class="post-title">
            <v-avatar class="profil-post" size="52px">
              <img
                v-if="post.User.photo"
                :src="post.User.photo"
                alt="Photo de profil"
              />
              <v-icon
                role="avatar personnalisé"
                v-else-if="
                  post.User.photo === null &&
                    post.User.id === $store.state.user.id
                "
                color="pink"
                size="52px"
                >$vuetify.icons.account</v-icon
              >
              <v-icon role="avatar" size="52px" v-else
                >$vuetify.icons.account</v-icon
              >
            </v-avatar>
            <div class="nom-date mt-3">
              <span class="pseudo text-left ml-5">{{ post.User.pseudo }}</span>
              <span class="date ml-5 text-left">{{
                post.createdAt | moment("calendar")
              }}</span>
            </div>
          </v-card-title>
          <div class="post-options">
            <v-tooltip v-if="$store.state.user.id == post.User.id" bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="mx-2"
                  fab
                  primary
                  x-small
                  v-bind="attrs"
                  v-on="on"
                  aria-label="modifier le post"
                  @click="getOnePost(post.id)"
                >
                  <v-icon class=" rounded-circle">$vuetify.icons.update</v-icon>
                </v-btn>
              </template>
              <span>Modifier</span>
            </v-tooltip>
            <v-tooltip
              v-if="
                $store.state.user.id === post.User.id ||
                  $store.state.user.admin === true
              "
              bottom
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="mx-2"
                  fab
                  primary
                  x-small
                  v-bind="attrs"
                  v-on="on"
                  aria-label="supprimer le post"
                  @click="deletePost(post.id)"
                >
                  <v-icon small class=" rounded-circle">
                    $vuetify.icons.delete
                  </v-icon>
                </v-btn>
              </template>
              <span>Supprimer</span>
            </v-tooltip>
          </div>
        </div>
        <div class="pl-3 pr-2-3">
          <v-card-text class="text-left">
            <p class="body-1">
              {{ post.message }}
            </p>
          </v-card-text>
        </div>
        <div class="pb-5">
          <v-img
            v-if="post.link"
            :src="post.link"
            alt="lien posté par l'utilisateur"
            :max-height="300"
            :max-width="400"
            class="mx-auto pb-5"
          >
          </v-img>
          <v-img
            v-if="post.imageUrl"
            :src="post.imageUrl"
            alt="image postée par l'utilisateur"
            :max-height="600"
            :max-width="400"
            class="mx-auto pb-5"
          >
          </v-img>
        </div>
        <v-divider></v-divider>
        <div class="d-flex flex-column align-end pr-3">
          <div>{{ post.Comments.length }} comments</div>
          <div>{{ post.Likes.length }} j'aime</div>
        </div>
        <v-divider></v-divider>
        <v-card-actions class="pt-5  pr-4 d-flex justify-space-between">
          <div class=" d-flex justify-md-space-between">
            <v-btn @click="show = !show" text aria-label="accès commentaires">
              Commentaires
            </v-btn>
            <v-btn icon @click="show = !show" aria-label="accès commentaires">
              <v-icon>{{
                show ? "mdi-chevron-up" : "mdi-chevron-down"
              }}</v-icon>
            </v-btn>
          </div>
          <div class="d-flex  align-end pr-3">
            <v-btn
              @click="likePost(post.id)"
              x-small
              aria-label="liker"
              class="like-btn"
            >
              <v-icon :color="isLiked">
                $vuetify.icons.like
              </v-icon>
            </v-btn>
          </div>
        </v-card-actions>
        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>
            <div class="comments-box d-flex flex-column justify-center">
              <v-card-text class="comment-input">
                <v-form
                  v-model="isValid"
                  @submit.prevent="onSubmitComment(post.id)"
                  enctype="multipart/form-data"
                  class="validate comment-form"
                >
                  <v-text-field
                    name="input-1-3"
                    label="ton commentaire"
                    v-model="data.commentMessage"
                    auto-grow
                    class="comment-form__message input-group--focused"
                  >
                  </v-text-field>
                  <v-btn
                    @click="onSubmitComment(post.id)"
                    :disabled="!isValid"
                    class="comment-form__btn"
                    aria-label="publier commentaire"
                    >Poster</v-btn
                  >
                </v-form>
                <div>
                  <div class="danger-alert" v-html="errorMessage" />
                  <div class="danger-alert" v-html="messageRetour" />
                </div>
              </v-card-text>
              <v-list
                v-for="comment in post.Comments"
                :key="comment.id"
                :comment="comment"
              >
                <v-list-item class="comment">
                  <v-list-item-avatar class="comment_photo">
                    <img
                      v-if="comment.User.photo !== null"
                      :src="comment.User.photo"
                      alt="Photo de profil"
                    />
                    <v-icon
                      v-else-if="
                        comment.User.photo === null &&
                          comment.UserId === $store.state.user.id
                      "
                      color="pink"
                      size="32px"
                      role="avatar"
                      >$vuetify.icons.account</v-icon
                    >
                    <v-icon v-else size="32px" role="avatar"
                      >$vuetify.icons.account</v-icon
                    >
                  </v-list-item-avatar>

                  <v-list-item-content class="comment_body d-flex ">
                    <strong
                      v-html="comment.User.pseudo"
                      class="pr-5 text-left  pseudo comment__pseudo"
                    ></strong>
                    <span
                      v-html="comment.message"
                      class=" text-left comment__message"
                    ></span>
                  </v-list-item-content>

                  <v-tooltip bottom>
                    <template
                      v-if="
                        $store.state.user.id === comment.UserId ||
                          $store.state.user.admin === true
                      "
                      v-slot:activator="{ on, attrs }"
                    >
                      <v-btn fab primary x-small v-bind="attrs" v-on="on">
                        <v-icon
                          @click="deleteComment(comment.id)"
                          class=" rounded-circle "
                          aria-label="supprimer commentaire"
                          >$vuetify.icons.delete
                        </v-icon>
                      </v-btn>
                    </template>
                    <span>Supprimer</span>
                  </v-tooltip>
                </v-list-item>
                <v-divider></v-divider>
              </v-list>
            </div>
          </div>
        </v-expand-transition>
      </div>
    </v-card>
  </div>
</template>

<script>
import PostService from "../services/PostService";
export default {
  name: "Posts",
  props: {
    post: {
      type: Object,
    },
  },
  data: function() {
    return {
      show: false,
      width: 500,
      commentForm: false,
      user: false,
      showFeed: true,
      update: false,
      isValid: true,
      rules: {
        required: (value) => !!value || "Required.",
      },
      messageRetour: null,
      errorMessage: null,
      data: {
        commentMessage: "",
        commentPseudo: this.$store.state.user.pseudo,
      },
    };
  },
  computed: {
    isLiked() {
      const userId = this.$store.state.user.id;
      let userLike = this.post.Likes.map((a) => a.UserId);
      if (userLike.includes(userId)) {
        return "pink";
      } else {
        return "";
      }
    },
  },
  methods: {
    async reloadFeed() {
      try {
        const response = await PostService.getPosts();
        this.posts = response.data;
      } catch (error) {
        this.errorMessage = error.response.data.error;
      }
    },
    getProfile(id) {
      this.$router.push(`/account/${id}`);
    },
    deletePost() {
      this.$emit("deletePost", this.post.id);
    },
    likePost() {
      this.$emit("likePost", this.post.id);
    },
    getOnePost(id) {
      this.$router.push(`posts/${id}`);
    },
    onSubmitComment(id) {
      this.$store.dispatch("getPosts");
      this.$store.dispatch("commentPost", {
        id: id,
        data: this.data,
      });
      this.data.commentMessage = "";
      this.$store.dispatch("getPosts");
      this.$store.dispatch("getPostById", this.post.id);
    },
    deleteComment(id) {
      this.$store.dispatch("deleteComment", id), this.reloadFeed();
    },
  },
};
</script>
<style lang="scss" scoped></style>