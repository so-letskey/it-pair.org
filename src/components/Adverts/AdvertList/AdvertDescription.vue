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
      <p>Date: {{ activeAdvert.date.toDate() }}</p>

      <div v-if="isAdvertOwner" id="modification-buttons">
        <router-link
          class="btn btn-primary btn-lg"
          :to="{
            name: 'advertModification',
            params: { id: activeAdvert.id }
          }"
          >Edit</router-link
        >
        <router-link
          :to="{
            name: 'advertsList'
          }"
        >
          <button class="btn btn-danger btn-lg" @click="deleteAdvert">
            Delete
          </button></router-link
        >
      </div>
      <router-link
        :to="{
          name: 'profileDetails',
          params: { id: activeAdvert.creatorsId }
        }"
      >
        <button class="btn btn-info btn-lg">
          Show Profile
        </button></router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    activeAdvert() {
      // return this.$store.getters.activeAdvert;
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
  },
  beforeCreate() {
    this.$store.dispatch("setActiveAdvert", this.$route.params.id);
  },
  destroyed() {
    this.$store.dispatch("deactivateAdvert");
  },
  methods: {
    deleteAdvert() {
      this.$store.dispatch("deleteAdvert", this.activeAdvert);
    }
  }
};
</script>

<style scoped>
.container {
  margin-top: 100px !important;
}
</style>
