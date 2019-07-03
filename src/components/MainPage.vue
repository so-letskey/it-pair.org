<template>
  <div id="main">
    <AdvertFiltering />
    <SingleCard
      v-for="(advert, index) in this.$store.state.advertsModule.adverts"
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
