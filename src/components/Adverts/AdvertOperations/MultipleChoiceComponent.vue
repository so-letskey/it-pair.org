<template>
  <Multiselect
    v-model="value"
    :options="options"
    :multiple="true"
    group-values="libs"
    group-label="language"
    :group-select="false"
    placeholder="Type to search"
    track-by="name"
    label="name"
    ><span slot="noResult"
      >Oops! No elements found. Consider changing the search query.</span
    ></Multiselect
  >
</template>

<script>
import Multiselect from "vue-multiselect";

export default {
  components: {
    Multiselect
  },
  data() {
    return {
      options: [
        {
          language: "Javascript",
          libs: [{ name: "Vue.js" }, { name: "Adonis" }]
        },
        {
          language: "Ruby",
          libs: [
            { name: "Rails", category: "Backend" },
            { name: "Sinatra", category: "Backend" }
          ]
        },
        {
          language: "Other",
          libs: [
            { name: "Laravel", category: "Backend" },
            { name: "Phoenix", category: "Backend" }
          ]
        }
      ],
      value: []
    };
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
