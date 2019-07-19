<template>
  <div id="main">
    <div class="jumbotron">
      <h1 class="display-4"><strong>IT</strong>Pair.org</h1>
      <p class="lead">
        Nie myślałem jeszcze nad tym co dokładnie miałoby się tutuj pojawić, to
        jest do przemyślenia.
      </p>
      <hr class="my-4" />
      <p>
        It uses utility classes for typography and spacing to space content out
        within the larger container.
      </p>
    </div>
    <AdvertFiltering />
  </div>
</template>

<script>
import AdvertFiltering from "./Adverts/AdvertList/AdvertFiltering.vue";

export default {
  components: {
    AdvertFiltering
  }
};
</script>

<style scoped>
.btn {
  color: white !important;
}
</style>
