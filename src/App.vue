<template>
  <v-app app>
    <v-content>
      <v-container>
        <v-alert
            v-if="hasNewUpdate"
            :value="true"
            type="grey darken-2"
          >
            <v-layout align-center justify-center row fill-height>
              <v-flex grow>
                A new update has arrived
              </v-flex>
              <v-flex shrink>
                <v-btn
                color="success"
                @click="updateApp"
                >
                  Update
                </v-btn>
                <v-btn
                    flat
                    @click="hasNewUpdate = false"
                  >
                    Close
                </v-btn>
              </v-flex>
            </v-layout>
          </v-alert>

        <v-card>
          <Header />
          <Recipes />
        </v-card>
      </v-container>
      <div class="text-xs-center"><small>&copy; 2019 app ver: {{ appVersion }}</small></div>
    </v-content>

    <v-snackbar
      :value="showSystemMessage"
      :timeout="900000"
      :top="true"
    >
      {{ systemMessage }}
      <v-btn
        color="blue"
        flat
        @click="showSystemMessage = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import Header from './components/Header'
import Recipes from './components/Recipes'
import { version } from '../package.json'

export default {
  name: 'App',
  components: {
    Header,
    Recipes
  },
  data () {
    return {
      hasNewUpdate: false,
      showSystemMessage: false,
      systemMessage: '',
      appVersion: ''
    }
  },
  mounted () {
    let inc = 0
    const watchSWorker = setInterval(() => {
      inc++
      if (inc >= 100) { clearInterval(watchSWorker) }
      if (window.cookingRecipesApp_SWorker.msg) {
        this.showSystemMessage = true
        this.systemMessage = window.cookingRecipesApp_SWorker.msg
        clearInterval(watchSWorker)
      }
    })
    this.appVersion = version
  },
  methods: {
    updateApp () {
      window.location.href = window.location.href + '?updateapp=true'
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
