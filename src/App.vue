<template>
  <div id="app">
    <NavigationBar />
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import NavigationBar from "./components/NavigationBar";

export default {
  name: "App",
  components: {
    NavigationBar
  }
};
</script>

<style lang="scss">
@import "./css/main.scss";
* {
  background-color: #5cdb95;
}
</style>
