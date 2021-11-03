<template>
  <div id="app">
    <div id="main-app">
      <Sidebar v-if="!['/', '/register'].includes(this.$route.path)"/>
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "./components/Sidebar.vue";

export default {
  components: {
    Sidebar,
  },
};
</script>

<style>
/*#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}*/

html, body {
  background: #eceaea;
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
}
.app {
  width: 100%;
  height: 100%;
}
.content {
  position: absolute;
  left: 20%;
  width: 80%;
  height: 100%;
  z-index: 1;
  bottom: 0;
  top: 0;
}
.box-content {
  position: relative;
  width: 80%;
  margin: auto;
  margin-top: 5%;
  min-height: 80%;
}
</style>
