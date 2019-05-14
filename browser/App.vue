<template>
  <div id="app">
    <v-app dark>
      <v-navigation-drawer app clipped permanent :mini-variant="$vuetify.breakpoint.smAndDown">
        <v-list>
          <v-list-tile @click="">
            <v-list-tile-action><v-icon>fa-headphones</v-icon></v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Library {{isMobile}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="">
            <v-list-tile-action><v-icon>fa-search</v-icon></v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Find Music</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="">
            <v-list-tile-action><v-icon>fa-cloud</v-icon></v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Search Soulseek</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="">
            <v-list-tile-action><v-icon>fa-cloud-upload-alt</v-icon></v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Upload Files</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="">
            <v-list-tile-action><v-icon>fa-exchange-alt</v-icon></v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Transfers</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="">
            <v-list-tile-action><v-icon>fa-comments</v-icon></v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Chatrooms</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="">
            <v-list-tile-action><v-icon>fa-envelope</v-icon></v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Messages</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="">
            <v-list-tile-action><v-icon>fa-user-friends</v-icon></v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Users</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider></v-divider>

          <v-list-tile @click="">
            <v-list-tile-action><v-icon>fa-cog</v-icon></v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Settings</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="">
            <v-list-tile-action><v-icon>fa-bug</v-icon></v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Diagnostics</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar app clipped-left>
        <v-toolbar-side-icon></v-toolbar-side-icon>
        <v-divider class="mx-2" inset vertical></v-divider>

        <img class="gg-header-img" width="48" src="./ghostgrab.svg">
        <v-toolbar-title><b>g</b>host<b>g</b>rab</v-toolbar-title>

        <v-spacer></v-spacer>
        <v-btn title="view your notifications" icon><v-icon>fa-bell</v-icon></v-btn>
        <v-btn title="edit your profile" icon large>
          <v-badge class="gg-status-badge" color="grey" bottom left overlap>
            <template v-slot:badge><span>&nbsp;</span></template>
            <v-avatar @click="" :tile="false" :size="38">
              <img src="https://avatars3.githubusercontent.com/u/919999" alt="your avatar">
            </v-avatar>
          </v-badge>
        </v-btn>
      </v-toolbar>
      <v-content>
        <v-container fluid>
          <hello></hello>
        </v-container>
      </v-content>
      <v-footer class="pa-2" style="align-items: center;" app>
        <v-spacer></v-spacer>
        <div>
          <v-icon small>fa-users</v-icon>&nbsp;
          <strong class="hidden-xs-only">Connections:&nbsp; </strong>
          2 / 100
        </div>
        <v-divider class="mx-2" vertical></v-divider>
        <div>
          <v-icon small>fa-arrow-down</v-icon>&nbsp;
          <strong class="hidden-xs-only">Download:&nbsp; </strong>
          9mb/s (2<span class="hidden-xs-only"> users</span>)
        </div>
        <v-divider class="mx-2" vertical></v-divider>
        <div>
          <v-icon small>fa-arrow-up</v-icon>&nbsp;
          <strong class="hidden-xs-only">Upload:&nbsp; </strong>
          2mb/s (1<span class="hidden-xs-only"> user</span>)
        </div>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
import Hello from './components/Hello.vue'

export default {
  name: 'app',
  components: {
    Hello
  },
  data: () => ({ }),
  mounted() { },
  methods: { }
}
</script>

<style>
.gg-status-badge .v-badge__badge {
  transform: scale(0.6);
}

.gg-emojicon {
  font-size: 24px;
}

.gg-header-img {
  margin-left: 8px;
  margin-right: -8px;
  min-width: 48px;
}

.v-navigation-drawer--mini-variant {
  overflow-x: hidden;
  overflow-y: auto;
}
</style>

<style scoped>
b {
  font-weight: 1000;
}
</style>
