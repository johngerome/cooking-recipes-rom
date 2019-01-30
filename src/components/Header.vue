<template>
  <v-img
      :aspect-ratio="16/9"
      src="https://lh3.googleusercontent.com/56gdqZBBf7QzIlL4jh3jrJhoWn-MAsgufH_UUvlruIjo-RxAQE4rbiBuDnQKyeSPrJcPeKOkck2FB2kfDbKIp4P3O2pzyW_O_Is3-ETeF8obMTgWHLTmCXcGE7OAxIfsY8lfzS57bsDXWbmUmr_IR30yGAlucf5TWFf23HC1tN6F7fDpe_WDM404p2dnktLhYXMccc9DzQKnCUWsN-WhWki3KQeKmNWSDZAqdk7o04jmQ5F1yHNfAumx5titTr7A3r-7xFyBOeRC6UgXvnnpaKFIeAGLXgwGVbl31Ix-RDI4P_MVTlMgrimvmNy30GsuWobB3pa9UalgTqCqpx79dn3FTLIdlnRcOcGeoro3WB7Op1hMvUQWQilPPEyEv9nmS6D2grN8UMwEP27dZDVK1HoqdLGsHRQXWVrNpoAKkmf8uwf-MKTByB0SRfCQWuDork8_pzEy-7crMpNQ4-x7C1n522WFcjDFfDY3yRqjyld9GitCuUrv5yLy_4QDFubcdwGR4oCLhrdRLh79geulrB506Mb9MBjT2hy5ccEgBnlVvAemlwp8rs1FLdfJA11fUlaCPFzBJsM1NjLEl4NVS56V6o9Ol9mmcZBNRlg5yil8v15YPQ-5hBOemHcyg7TcvKDSYgV16BEJ2L05gTOwONMD=w976-h300-no"
      gradient="to top, rgba(0,0,0, 0.6) 0%,rgba(254,255,255,0) 100%"
      height="300px"
    >
      <v-layout column fill-height>
        <v-spacer></v-spacer>

        <v-card-title class="white--text pl-2 pt-5">
          <div class="flex xs11">
            <div class="display-1 pl-3">Cooking Recipes</div>
            <div class="title pl-3 grey--text text--lighten-1">
              Ragnarok Mobile Eternal Love - SEA
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
