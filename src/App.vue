<template>
  <v-app app>
    <v-content>
      <v-container>
        <v-card>
          <Header />
          <Recipes />
        </v-card>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Header from './components/Header'
import Recipes from './components/Recipes'

export default {
  name: 'App',
  components: {
    Header,
    Recipes
  },
  data () {
    return {
      //
    }
  }
}
</script>

<style lang="scss" scoped>
@media only screen and (min-width: 1200px) {
  .container {
    max-width: 1024px;
    margin: 0 auto;
  }
}
</style>
