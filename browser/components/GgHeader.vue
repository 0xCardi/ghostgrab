<template>
  <v-toolbar app clipped-left>
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-divider class="mx-2" inset vertical></v-divider>
    <img class="gg-header-img" width="48" src="./ghostgrab.svg">
    <v-toolbar-title><b>g</b>host<b>g</b>rab</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn title="view your notifications" icon>
      <v-icon small>fa-bell</v-icon>
    </v-btn>
    <v-btn title="upload files" icon>
      <v-icon small>fa-cloud-upload-alt</v-icon>
    </v-btn>
    <v-btn title="edit your profile" icon large>
      <v-badge class="gg-status-badge" bottom color="grey" left overlap>
        <template v-slot:badge><span>&nbsp;</span></template>
        <v-avatar @click="" :tile="false" :size="38">
          <img src="https://avatars3.githubusercontent.com/u/919999" alt="your avatar">
        </v-avatar>
      </v-badge>
    </v-btn>
  </v-toolbar>
</template>

<style scoped>
b {
  font-weight: 1000;
}

.gg-header-img {
  margin-left: 8px;
  margin-right: -8px;
  min-width: 48px;
}
</style>

<script>
export default {
  name: 'gg-header'
}
</script>
