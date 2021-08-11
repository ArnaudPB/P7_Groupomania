<template>
  <div>
    <v-card class="posts-card mx-auto mt-4 mb-4 pb-5" round elevation="2">
      <div>
        <div class="d-flex justify-space-between pr-2 blue-grey lighten-2">
          <v-card-title class="h6"
           >Post publié par {{ pseudo }} {{ id }} ||| le
            {{ createdAt.split("T")[0] }}
          </v-card-title>
          <div class="post-options">
            <v-btn
            
              v-if="userId === this.$store.state.user.id"
              @click="getOnePost"
              class="mx-2"
              fab
              dark
              x-small
              color="white"
            >
             <v-icon class=" rounded-circle">{{ mdiUpdate }}</v-icon>
            </v-btn>
            <v-btn
              v-if="
                userId === this.$store.state.user.id ||
                  this.$store.state.user.admin === true
              "
              class="mx-2"
              fab
              dark
              x-small
              color="white"
            >
            <v-icon @click="deletePost({ id })" small class=" rounded-circle">
                {{ mdiTrashCanOutline }}
              </v-icon>
            </v-btn>
          </div>
        </div>
        <div class="pl-3 pr-2-3">
          <v-card-text class="text-left">
            <p class="body-1">
              {{ message }}
            </p>
          </v-card-text>
        </div>
        <div class="pb-5">
          <v-img
            v-if="link"
            :src="link"
            :max-height="600"
            :max-width="400"
            class="mx-auto pb-5"
          >
          </v-img>

          <v-img
            v-if="imageUrl"
            :src="imageUrl"
            :max-height="600"
            :max-width="400"
            class="mx-auto pb-5"
          >
          </v-img>
        </div>

        <v-divider></v-divider>
         <v-card-actions class="pt-5  pr-4 d-flex justify-md-space-between">
          <div class="">
           <v-btn @click="show = !show, getPostId({id})" color="red lighten-2 " text>
              Commentaires
            </v-btn>
            <v-btn icon @click="show = !show">
              <v-icon>{{
                show ? "mdi-chevron-up" : "mdi-chevron-down"
              }}</v-icon>
            </v-btn>

          </div>

           <div>
             <v-btn

              @click="getPostId({id}),addComment()"
              class="mx-2"
              fab
              dark
              x-small
              color="white"
            >
              <v-icon class=" rounded-circle">{{ mdiUpdate }}</v-icon>
            </v-btn>
            <v-btn @click="likePost">
              <v-icon class=" material-icons ">
                {{ mdiEmoticonOutline }}
              </v-icon>
              {{ Likes.filter(obj => obj.type === true).length }}
            </v-btn>
            <v-btn @click="dislikePost" class="ml-3">
              <v-icon>{{ mdiEmoticonSadOutline }}</v-icon>
              {{ Likes.filter(obj => obj.type === false).length }}
            </v-btn>
          </div>
        </v-card-actions>
        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>
             <div class="comments-box">               

              <v-list v-for="comment in comments" :key="comment.id">
                <v-list-item>
                  <v-list-item-avatar>
                    <v-icon>{{ mdiAccountCircle }}</v-icon>
                  </v-list-item-avatar>

             <v-list-item-content>
                   <div class="comment mt-5 ">
                      <strong
                        v-html="comment.pseudo" class="pr-5 comment__pseudo"
                      ></strong>
                      <p
                        v-html="comment.message" class="pr-2 text-left comment__message"
                      ></p>
                     <v-icon
                        @click="deleteComment"
                        class=" rounded-circle comment-delete">{{ mdiCloseThick }}
                        </v-icon>



                    </div>
                  </v-list-item-content>
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
//import DeleteButton from "../components/DeleteButton";

import { mdiEmoticonOutline } from "@mdi/js";
import { mdiEmoticonSadOutline } from "@mdi/js";
import { mdiTrashCanOutline } from "@mdi/js";
import { mdiUpdate } from "@mdi/js";
import { mdiAccountCircle } from "@mdi/js";
import { mdiCloseThick} from "@mdi/js";
//import Likes from "../components/Likes.vue";
//import PostService from "../services/PostService";
export default {
  name: "Posts",
   /* components: {
    DeleteButton
  } */
  props: {
    link: {
      type: String
    },
      message: {
        type: String,
      },
      userid: {
        type: Number,
      },
      pseudo: {
        type: String,
      },
    imageUrl: {
      type: String
    },
    postUrl: {
      type: String
    },
    Likes: {
      type: Array
    },
    createdAt: {
      type: String
    },
    comments: {
    type: Array
    }
},
    data: function() {
      return {
        show: false,
        mdiEmoticonOutline,
        mdiEmoticonSadOutline,
        mdiTrashCanOutline,
        mdiCloseThick,
        mdiUpdate,
        mdiAccountCircle,
        width: 500,
        postId: 0,
        commentForm:false,
        likes:"",
        dislikes:"",
        user: false,
        showFeed: true,
        update: false,
        isValid: true,
         data: {
        commentMessage:"",
        commentPseudo: this.$store.state.user.pseudo,
      },
        rules: {
        required: value => !!value || "Required."
       },
      messageRetour: null,
      errorMessage: null
        };
        },
  methods: {
    deletePost() {
      this.$emit("deletePost", this.id);
     },
    getOnePost() {
      this.$router.push(this.postUrl);
    },
     getPostId(id) {
      this.postId = parseInt(Object.values(id));
      console.log(this.postId);
    },
    addComment() {
      const id = this.postId
      this.$router.push(`/posts/${id}/addcomment`)
    },
    likePost() {
    },
    dislikePost() {
    },
    showComentForm() {
      this.commentForm = true      
    },
    deleteComment() {
    }
  }
};
</script>
<style lang="scss" scoped>
/*.posts-card {
  width: 40em;
}*/
.body-1 {
  font-size: 20px;
  border: 2px grey solid;
  padding: 15px;
}
.posts-row {
  justify-content: center;
}
.materials-icons {
  color: brown;
}
.post-options {
  margin-top: 1rem;
  display: flex;
}
.update-title {
  display: flex;
  justify-content: space-between;
}
.comment {
  display: flex;
   align-content: center;
  position: relative;
  &__pseudo {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  &__message {
    width: 30rem;
  }

}
  .comment-delete {  
    position: absolute;
    right: 0;
    bottom: 10px;   
}
.comment-form {
  display: flex;
  justify-content: space-between;
 
  
  padding: 10px;
  
  &__btn {
    margin-left: 1rem;
   margin-top:0.33rem;
  }
}
</style>