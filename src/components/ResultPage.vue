<template>
  <div id="result-page-container">
    <AdvertFiltering />
    <SingleSearchResult
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
    <div
      v-if="
        this.$store.state.filteringEngine.noResultsLeftToDisplay ||
          this.$store.state.filteringEngine.noResultsToDisplay
      "
    >
      <p id="no-more-results-to-show-info">
        Didn't find what you were looking for?<br />
        Don't worry, you can always
        <router-link :to="{ name: 'advertAddition' }">
          <span class="red-text link">add your own advert.</span></router-link
        >
      </p>
    </div>
  </div>
</template>

<script>
import SingleSearchResult from "./Adverts/AdvertList/SingleSearchResult.vue";
import AdvertFiltering from "./Adverts/AdvertList/AdvertFiltering.vue";

export default {
  components: {
    AdvertFiltering,
    SingleSearchResult
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

        if (
          bottomOfWindow &&
          !this.$store.state.filteringEngine.InitialSearch &&
          !this.$store.state.filteringEngine.loading &&
          !this.$store.state.filteringEngine.noResultsLeftToDisplay &&
          !this.$store.state.filteringEngine.noResultsToDisplay
        ) {
          let searchParameters = this.$store.getters.searchParameters;
          this.$store.dispatch("loadAdverts", searchParameters);
        }
      };
    }
  }
};
</script>
