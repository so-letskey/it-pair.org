<template>
  <div id="main">
    <div class="jumbotron">
      <h1 class="display-4">Strona główna</h1>
      <p class="lead">
        Nie myślałem jeszcze nad tym co dokładnie miałoby się tutuj pojawić, to
        jest do przemyślenia.
      </p>
      <hr class="my-4" />
      <p>
        It uses utility classes for typography and spacing to space content out
        within the larger container.
      </p>
      <router-link :to="{ name: 'advertsList' }"
        ><a class="btn btn-primary btn-lg" role="button"
          >Learn more</a
        ></router-link
      >
    </div>
  </div>
</template>

<style scoped>
.btn {
  color: white !important;
}
</style>
