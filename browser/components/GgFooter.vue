<template>
  <v-footer class="pa-2" app>
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
</template>

<script>
export default {
  name: 'gg-footer'
}
</script>
