<template>
  <v-footer fixed v-bind="localAttrs" :padless="padless">
    <v-card flat tile width="100%" class="red lighten-4 text-center">
      <v-card-text class="white--text">
        <v-btn  to="/" icon class="mx-4">
          <v-icon  size="24px">
            {{ mdiHome }}
          </v-icon>
        </v-btn>
        {{ new Date().getFullYear() }} — <strong>Groupomania</strong>
        <v-btn icon class="mx-4">
          <v-icon size="24px">
            {{ mdiEmail }}
          </v-icon>
        </v-btn>
      </v-card-text>
    </v-card>
  </v-footer>
</template>
<script>
  import { mdiHome } from '@mdi/js';
  import { mdiEmail } from '@mdi/js';
  export default {
    name: 'PageFooter',
    data: () => ({
      mdiHome,
      mdiEmail,
      items: ['default', 'absolute', 'fixed'],
      padless: false,
      variant: 'default',
    }),
    computed: {
      localAttrs() {
        const attrs = {};
        if (this.variant === 'default') {
          attrs.absolute = false;
          attrs.fixed = false;
        } else {
          attrs[this.variant] = true;
        }
        return attrs;
      },
    },
  };
</script>