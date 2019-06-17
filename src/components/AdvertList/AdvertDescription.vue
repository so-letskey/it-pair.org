<template>
  <div class="container">
    <div class="jumbotron">
      <h1 class="display-4">{{ activeAdvert.title }}</h1>
      <p class="lead">
        {{ activeAdvert.description }}
      </p>
      <hr class="my-4" />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, amet
        similique esse dolore fuga autem! Commodi, quia dolorem ullam cupiditate
        voluptatibus itaque iste!
      </p>
      <a
        v-if="isAdvertOwner"
        class="btn btn-primary btn-lg"
        href="#"
        role="button"
        >Edit</a
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeAdvert: this.$store.state.advertsModule.adverts.find(
        advert => advert.id == this.$route.params.id
      )
    };
  },
  computed: {
    isAdvertOwner() {
      return this.$store.state.userDataModule.activeUser.registeredAdverts.includes(
        this.activeAdvert.id
      );
    }
  }
};
</script>

<style scoped>
.container {
  margin-top: 100px !important;
}
</style>
