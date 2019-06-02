<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
    name: 'app',
    data () {
        return {
            msg: 'Witaj na stronie IT-pair.org'
        };
    }
};
</script>

<style lang="scss">
</style>
