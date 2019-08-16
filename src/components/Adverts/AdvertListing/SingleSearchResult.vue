<template>
  <div id="single-search-result-container" class="card">
    <div id="single-search-result" class="card-body">
      <div id="single-search-result__main-info">
        <h3 class="card-title">{{ advert.title }}</h3>
        <h5 class="card-title">{{ advert.description }}</h5>
        <strong>Published: </strong>
        {{
          advert.creationDate.toDate().getDate() +
            "." +
            (advert.creationDate.toDate().getMonth() + 1) +
            "." +
            advert.creationDate.toDate().getFullYear()
        }}
        <br />
        <router-link
          :to="{
            name: 'advertDescription',
            params: { id: advert.id }
          }"
          ><button class="button single-search-result-button">
            READ MORE
          </button></router-link
        >
      </div>
      <div id="single-search-result__side-info">
        <strong>Tech stack </strong>
        <ul>
          <li v-for="(technology, index) in advert.technologies" :key="index">
            {{ technology.name }}
          </li>
        </ul>
        <strong>Language: </strong> {{ advert.language }} <br />
        <strong>Country: </strong>{{ advert.country }} <br />
        <strong>City: </strong>{{ advert.city }} <br />
        <strong>Level: </strong>{{ advert.difficulty }}
      </div>
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
