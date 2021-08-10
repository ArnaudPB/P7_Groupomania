<template>
  <div>
    <v-card class="posts-card mx-auto mt-4 mb-4" elevation="2">
      <div>
        <div class="d-flex justify-space-between pr-2 blue-grey lighten-2">
          <v-card-title class="h6">Post</v-card-title>
          <p class="mt-5">publié par {{ pseudo }}</p>
        </div>
        <div class="pl-3 pr-2-3">
          <v-card-text class="text-left">
            <p></p>
            {{ message }}</v-card-text
          >
        </div>
        <v-img :src="link" height="250" width="350" class="mx-auto"></v-img>
        <v-card-actions>
          <v-btn @click="show = !show" color="red lighten-2" text>
            Commentaires
          </v-btn>
          <v-btn
            ><v-icon class=" material-icons ">{{
              mdiEmoticonOutline
            }}</v-icon></v-btn
          >
          <v-btn
            ><v-icon>{{ mdiEmoticonSadOutline }}</v-icon></v-btn
          >
          <v-btn
            ><v-icon>{{ mdiUpdate }}</v-icon></v-btn
          >
          <v-btn
            ><v-icon>{{ mdiTrashCanOutline }}</v-icon></v-btn
          >
      <v-spacer></v-spacer>

          <v-btn icon @click="show = !show">
            <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
        </v-card-actions>
        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>

            <v-card-text>
              I'm a thing. But, like most politicians, he promised more than he
              could deliver. You won't have time for sleeping, soldier, not with
              all the bed making you'll be doing. Then we'll go with that data
              file! Hey, you add a one and two zeros to that or we walk! You're
              going to do his laundry? I've got to find a way to escape.
            </v-card-text>
          </div>
        </v-expand-transition>
      </div>
    </v-card>
  </div>
</template>
<script>
import { mdiEmoticonOutline } from "@mdi/js";
import { mdiEmoticonSadOutline } from "@mdi/js";
import { mdiTrashCanOutline } from "@mdi/js";
import { mdiUpdate } from "@mdi/js";
export default {
  name: "Posts",
  props: {
    link: {
      type: String
    },
      title: {
        type: String,
        required: true,
      },
      message: {
        type: String,
      },
      user_id: {
        type: Number,
      },
      pseudo: {
        type: String,
      },
    },
    data() {
      return {
        show: false,
        mdiEmoticonOutline,
        mdiEmoticonSadOutline,
        mdiTrashCanOutline,
        mdiUpdate,
      };
    },
  };
</script>
<style lang="scss" scoped>
.posts-card {
  width: 40em;
}
.posts-row {
  justify-content: center;
}
.materials-icons {
  color: brown;
}
</style>