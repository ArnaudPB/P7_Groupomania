<template>
  <v-container fluid class="feed-container">
    <v-row class="bloc">
      <v-col sm="12" md="6" class="mx-auto">
        <v-card flat class="posts-card ">
          <v-img
            :src="require('../assets/logo_transparent.png')"
            class="my-2"
            contain
            height="50"
            alt="logo groupomania"
          />
          <h1 class="font-weight-regular text-center">Le fil d'actu !</h1>
          <v-card-title
            class=" d-flex justify-space-between"
            fixed
            flat
            dense
            dark
          >
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  to="/posts"
                  small
                  class="recents"
                  v-bind="attrs"
                  v-on="on"
                >
                  Les + récents
                </v-btn>
              </template>
              <span>Les plus récents</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  to="/hot"
                  small
                  class="hot-posts"
                  v-bind="attrs"
                  v-on="on"
                >
                  Les + likés
                </v-btn>
              </template>
              <span>Les plus likés</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn small to="/add" v-bind="attrs" v-on="on">
                  <v-icon aria-label="publier" role="img" aria-hidden="false">{{
                    mdiPencilOutline
                  }}</v-icon>
                </v-btn>
              </template>
              <span>Publier</span>
            </v-tooltip>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <v-row
      class=" bloc2 text-center d-flex flex-column justify-center align-center"
    >
      <v-col sm="12" md="6" class="mx-auto">
        <v-card
          v-if="$store.state.posts.length !== 0"
          class="posts-card mx-auto"
          elevation="2"
        >
          <v-card-text>
            <posts
              v-for="post of posts"
              :key="post.id"
              :post="post"
              :id="post.id"
              @deletePost="deletePost(post.id)"
              @likePost="likePost(post.id)"
              @reloadFeed="reloadFeed()"
              @onSubmitComment="onSubmitComment(post.id)"
              @deleteComment="deleteComment(comment.id)"
            >
            </posts>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-card
      v-if="$store.state.posts.length === 0"
      class="posts-card mx-auto"
      elevation="0"
    >
      <v-card-title class="d-flex justify-center" flat dense dark>
        <span>Sois le premier à publier un post !</span>
      </v-card-title>
    </v-card>
  </v-container>
</template>

<script>
import Posts from "@/components/Posts.vue";
import { mdiPencilOutline } from "@mdi/js";
export default {
  name: "HotFeed",
  components: {
    Posts,
  },
  data() {
    return {
      errorMessage: null,
      mdiPencilOutline,
    };
  },
  computed: {
    posts() {
      return this.$store.getters.posts;
    },
    isLiked() {
      return this.$store.getters.isLiked;
    },
  },
  async beforeMount() {
    this.$store.dispatch("getHotPosts");
  },
  methods: {
    deletePost(id) {
      this.$store.dispatch("deletePost", id);
    },
    deleteComment(id) {
      this.$store.dispatch("deleteComment", id);
    },
    likePost(id) {
      const data = 1;
      this.$store.dispatch("likePost", {
        id: id,
        data: data,
      });
    },
  },
};
</script>

<style></style>