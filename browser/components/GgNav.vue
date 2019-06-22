<template>
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
</template>
