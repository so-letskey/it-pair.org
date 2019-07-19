<template>
  <div id="main">
    <AdvertFiltering />
    <div
      v-if="this.$store.state.filteringEngine.loading"
      class="d-flex justify-content-center"
    >
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <SingleCard
      v-for="(advert, index) in this.$store.state.advertsModule.adverts"
      v-else
      :key="'Advert: ' + index"
      :advert="advert"
    />
  </div>
</template>

<script>
import SingleCard from "./Adverts/AdvertList/SingleCard.vue";
import AdvertFiltering from "./Adverts/AdvertList/AdvertFiltering.vue";

export default {
  components: {
    AdvertFiltering,
    SingleCard
  },
  destroyed() {
    this.$store.dispatch("resetAdverts");
  }
};
</script>

<style scoped>
.card {
  min-width: 800px;
  margin: 30px 50px;
}

#main {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
