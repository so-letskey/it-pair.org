<template>
  <div id="main">
    <SingleCard
      v-for="(advert, index) in this.$store.state.adverts"
      :key="'Advert: ' + index"
      :advert="advert"
    />
  </div>
</template>

<script>
import SingleCard from "./SingleCard.vue";

export default {
  components: {
    SingleCard
  }
};
</script>

<style scoped>
.card {
  max-width: 800px;
  margin: 30px 50px;
}
</style>
