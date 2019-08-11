<template>
  <div id="main">
    <AdvertFiltering />
    <SingleCard
      v-for="(advert, index) in this.$store.state.advertsModule.adverts"
      :key="'Advert: ' + index"
      :advert="advert"
    />
    <div
      v-if="this.$store.state.filteringEngine.loading"
      class="d-flex justify-content-center"
    >
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
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
  mounted() {
    this.resultUpdateOnScroll();
  },
  destroyed() {
    this.$store.dispatch("resetSearch");
  },
  methods: {
    //Adding results
    resultUpdateOnScroll() {
      window.onscroll = () => {
        let bottomOfWindow =
          window.innerHeight + window.pageYOffset >=
          document.body.offsetHeight - 2;
        // document.documentElement.scrollTop + window.innerHeight ===
        // document.documentElement.offsetHeight;

        if (
          bottomOfWindow &&
          !this.$store.state.filteringEngine.InitialSearch &&
          !this.$store.state.filteringEngine.loading
        ) {
          let searchParameters = this.$store.getters.searchParameters;
          this.$store.dispatch("loadAdverts", searchParameters);
        }
      };
    }
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
