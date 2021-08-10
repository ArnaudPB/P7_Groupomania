<template>
   <v-app>
    <page-header></page-header>
    <v-main>
      <v-container fluid>
        <router-view></router-view>
        <!-- Display view pages here based on route -->
      </v-container>
    </v-main>
    <page-footer></page-footer>
  </v-app>
</template>

<script>
  import PageHeader from './components/Header.vue';
  import PageFooter from './components/Footer.vue';
  export default {
    name: 'app',
    components: {
      PageHeader,
      PageFooter,
    },
     data: () => {
      return {
        drawer: false,
      };
    },
  };
</script>
<style lang="scss">
  .v-btn {
    color: #003032 !important;
    &:hover {
      color: #ff4081 !important; /*accent color*/
    }
  }
</style>