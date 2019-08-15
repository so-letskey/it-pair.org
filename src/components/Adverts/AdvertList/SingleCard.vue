<template>
  <div class="card">
    <div class="card-body">
      <div class="main-info">
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
          ><button class="myBtn">
            READ MORE
          </button></router-link
        >
      </div>
      <div class="side-info">
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

<style scoped>
.card {
  width: 800px;
  border-top: 1px #8e8d8a solid !important;
  border-bottom: 1px solid #838d8a !important;
  border-left: 0px solid !important;
  border-right: 0px solid !important;
  border-radius: 0px !important;
  background-color: #eae7dc;
}

.card-body {
  display: grid;
  grid-template-columns: 5fr 2fr;
}

.side-info {
  grid-column-start: 2;
  grid-column-end: 3;
  align-self: center;
  border-left: 1px solid #e85a4f;
  padding-left: 20px;
  padding-bottom: 5px;
}

.myBtn {
  border: 1px solid #8e8d8a;
  border-radius: 5px;
  background: white;
  margin-top: 18px;
  transition: all 100ms linear;
  font-size: 14px;
  height: 38px;
  width: 110px;
  color: #8e8d8a;
  border: 1px solid #5f5f5d;
  color: #4b4b48;
}

.myBtn:hover {
  border: 1px solid #4b4b48;
  color: #4b4b48;
}

ul {
  -moz-column-count: 4;
  -moz-column-gap: 20px;
  -webkit-column-count: 4;
  -webkit-column-gap: 20px;
  column-count: 2;
  column-gap: 10px;
  margin-top: 0px;
  margin-bottom: 0px;
}
</style>
