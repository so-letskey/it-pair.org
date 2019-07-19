<template>
  <div class="card">
    <h5 class="card-header">{{ advert.title }}</h5>
    <div class="card-body">
      <h5 class="card-title">{{ advert.description }}</h5>
      <div class="card-text">
        <ul>
          <li v-for="(technology, index) in advert.technologies" :key="index">
            {{ technology.name }}
          </li>
        </ul>
        {{ advert.language }} <br />
        {{ advert.country }} <br />
        <strong>{{ advert.difficulty }}</strong>
      </div>
      <router-link
        :to="{
          name: 'advertDescription',
          params: { id: advert.id }
        }"
        ><button class="btn btn-primary btn-sm">
          Read More
        </button></router-link
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

<style scoped>
.btn {
  margin-top: 10px;
}
</style>
