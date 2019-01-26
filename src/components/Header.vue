<template>
  <v-img
      src="https://lh3.googleusercontent.com/MwuLMbo1R5a6Y4Egp_n3dme-owpVSeWdeWpNRDF1gmXRDKpTNCTrlCYIIX7vgd_RsMYNZ4p7jVWLJfF_SyczCgFj_B4wvyhq4DrPveFO0Pt4XwJnMUkYOljIK_iHReyVVTJiL5J3P_Z3yiXIkgcAFrXFt-aquszm3zMoUxeI_283WAiU_TZJ0Bia8tMC3P0gF02_OqfBukbz7E1jpA4q1TfwiilPjQ8hoOL2QmR-fITf8cS2lGpi7q396ki_6aCTjhkXESa5zz6gicvVbhXjfZDdobOqKVZEgHVIe4pEXo_DZGGwnBCZ5nHVnXEZQkMyW4Vfd5pfvA4qFmoBfM7KXp1lREmEEL4gt7C9cJgCxF5z0nJAZROCED63oBTJxEY-vfkdCTrdJer6jZ5jiqH4FI9keM7WrWRCkZ6qzCkGXUbgMAEpld2Z1OAajmkukuxPHP85b9QgJBw5TzHjaGa5xAxVfJIVGr56ngwk11ibtIA55kVuBTa8ZFA1UGrl2sfn_FPgjqptmHA3RwAm7BTd7gPdRNp3rlrBr_zfBaLGVVv9V8sOcM-P8KCX8PzH9xWm_1yVIMSGapJyu2xnSkLRBExTCU2k8_B_Wu5WRNiy1QAzhbkIZGneA7vseEMMOja7UadUptkCqN8BG7n-WcmHwczl=w804-h453-no"
      gradient="to top, rgba(0,0,0, 0.8) 0%,rgba(254,255,255,0) 100%"
      height="300px"
    >
      <v-layout column fill-height>
        <v-spacer></v-spacer>

        <v-card-title class="white--text pl-2 pt-5">
          <div class="flex xs11">
            <div class="display-1 pl-3">Cooking Recipes</div>
            <div class="title pl-3 grey--text text--lighten-1">
              Ragnarok Mobile Eternal - SEA
            </div>
          </div>

          <div class="flex xs1 align-self-end text-xs-right">
            <v-menu bottom left>
              <v-btn slot="activator" dark icon>
                <v-icon>more_vert</v-icon>
              </v-btn>
              <v-list>
                <v-dialog v-model="aboutUsDialog" width="500">
                  <v-list-tile avatar slot="activator">
                    <v-icon>contact_support</v-icon>
                    <v-list-tile-content class="px-2">
                      <v-list-tile-title>About</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>

                  <v-card>
                    <v-card-title class="headline grey lighten-2" primary-title>
                      About
                    </v-card-title>

                    <v-card-text class="text-center">
                      Made with ♥️ by
                      <a href="mailto:johngerome@gmail.com">Gazza</a>, Guild:
                      WildHogs, CH: EN4
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="primary"
                        flat
                        @click="aboutUsDialog = false;"
                      >
                        Close
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-list-tile avatar @click="reportBugSuggestions">
                  <v-icon>bug_report</v-icon>
                  <v-list-tile-content class="px-2">
                    <v-list-tile-title>Bug Report / Suggestions</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-menu>
          </div>
        </v-card-title>
      </v-layout>
    </v-img>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      aboutUsDialog: false
    }
  },
  methods: {
    reportBugSuggestions () {
      window.location.href = 'mailto:johngerome@gmail.com'
    }
  }
}
</script>
