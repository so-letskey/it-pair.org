<template>
  <div class="card">
    <h5 class="card-header">{{ advert.title }}</h5>
    <div class="card-body">
      <h5 class="card-title">{{ advert.description }}</h5>
      <div class="card-text">
        <strong>Date of creation: </strong>
        {{
          advert.creationDate.toDate().getDate() +
            "." +
            (advert.creationDate.toDate().getMonth() + 1) +
            "." +
            advert.creationDate.toDate().getFullYear()
        }}
        <br />
        <strong>Tech stack</strong>
        <ul>
          <li v-for="(technology, index) in advert.technologies" :key="index">
            {{ technology.name }}
          </li>
        </ul>
        <strong>Language: </strong> {{ advert.language }} <br />
        <strong>Country: </strong>{{ advert.country }} <br />
        <strong>Level: </strong>{{ advert.difficulty }}
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
