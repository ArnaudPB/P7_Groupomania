<template>
     <div>
            <v-btn>
              <v-icon class=" material-icons ">
                {{ mdiEmoticonOutline }}
              </v-icon>
              {{ likes }}
            </v-btn>
            <v-btn class="ml-3">
              <v-icon>{{ mdiEmoticonSadOutline }}</v-icon>
              {{ dislikes }}
            </v-btn>
          </div>
</template>
<script>
import { mdiEmoticonOutline } from "@mdi/js";
import { mdiEmoticonSadOutline } from "@mdi/js";
export default {
    name: "Likes",
    props: {
        likes: {
            type: Number
        },
        dislikes: {
            type: Number
        }
    },
     data() {
    return {
      
      mdiEmoticonOutline,
      mdiEmoticonSadOutline
    }
     }
}
</script>
<style lang="scss" scoped>
</style> 