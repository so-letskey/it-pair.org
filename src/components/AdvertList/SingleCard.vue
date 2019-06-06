<template>
  <div class="card">
    <h5 class="card-header">{{ advert.title }}</h5>
    <div class="card-body">
      <h5 class="card-title">{{ advert.description }}</h5>
      <p class="card-text">
        With supporting text below as a natural lead-in to additional content.
      </p>
      <router-link
        :to="{ name: 'advertDescription', params: { id: advert.id } }"
        >Read More</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    advert: {
      type: Object,
      default: function() {
        return {
          title: "None",
          description: "Not passed"
        };
      }
    }
  }
};
</script>
