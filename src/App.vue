<template>
  <div id="app">
    <NavigationBar />
    <main>
      <!-- the :key attribute is responsible for refreshing the components on route change -->
      <router-view :key="$route.fullPath"></router-view>
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
body {
  background-color: #eae7dc;
}
</style>
