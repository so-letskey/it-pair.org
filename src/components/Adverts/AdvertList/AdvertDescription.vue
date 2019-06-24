<template>
  <div class="container">
    <div class="jumbotron">
      <h1 class="display-4">{{ activeAdvert.title }}</h1>
      <p class="lead">
        {{ activeAdvert.description }}
      </p>
      <hr class="my-4" />
      <ul>
        <li
          v-for="(technology, index) in activeAdvert.technologies"
          :key="'index: ' + index"
        >
          {{ technology.name }}
        </li>
      </ul>
      <p>Difficulty: {{ activeAdvert.difficulty }}</p>

      <router-link
        v-if="isAdvertOwner"
        class="btn btn-primary btn-lg"
        :to="{
          name: 'advertModification',
          params: { id: activeAdvert.id }
        }"
        >Edit</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    activeAdvert() {
      return this.$store.state.advertsModule.adverts.find(
        advert => advert.id == this.$route.params.id
      );
    },
    isAdvertOwner() {
      if (this.$store.state.userDataModule.activeUser !== null) {
        return this.$store.state.userDataModule.activeUser.registeredAdverts.includes(
          this.activeAdvert.id
        );
      } else return false;
    }
  }
};
</script>

<style scoped>
.container {
  margin-top: 100px !important;
}
</style>
