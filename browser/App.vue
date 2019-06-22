<template>
  <div id="app">
    <v-app dark>
      <!--<gg-nav></gg-nav>
      <gg-header></gg-header>
      <v-content>
        <v-container fluid>
          <hello></hello>
        </v-container>
      </v-content>
      <gg-footer></gg-footer>-->
			<gg-login></gg-login>
    </v-app>
  </div>
</template>

<script>
import Hello from './components/Hello.vue';
import GgFooter from './components/GgFooter.vue';
import GgHeader from './components/GgHeader.vue';
import GgLogin from './components/GgLogin.vue';
import GgNav from './components/GgNav.vue';

export default {
  name: 'app',
  components: {
    GgHeader, GgNav, GgLogin, GgFooter, Hello
  }
}
</script>

<style>
.gg-status-badge .v-badge__badge {
  transform: scale(0.6);
}

.gg-emojicon {
  font-size: 24px;
}

.v-navigation-drawer--mini-variant {
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
