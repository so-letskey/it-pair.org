<template>
  <div class="container">
    <div v-if="activeAdvert === null" class="d-flex justify-content-center">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div v-else class="content">
      <h1 class="display-4">{{ activeAdvert.title }}</h1>
      <div id="description-grid">
        <div id="main-text-column">
          <p class="lead">{{ activeAdvert.description }}</p>
        </div>
        <div id="key-info-column">
          <div class="side-info">
            <div id="side-info-container">
              <span id="tech-stack"
                ><strong>Tech stack </strong>
                <ul>
                  <li
                    v-for="(technology, index) in activeAdvert.technologies"
                    :key="index"
                  >
                    {{ technology.name }}
                  </li>
                </ul>
              </span>
              <strong>Language: </strong> {{ activeAdvert.language }} <br />
              <strong>Country: </strong>{{ activeAdvert.country }} <br />
              <strong>City: </strong>{{ activeAdvert.city }} <br />
              <strong>Level: </strong>{{ activeAdvert.difficulty }} <br />
              <div id="contact-button-container">
                <button class="myBtn">
                  CONTACT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="isAdvertOwner" id="modification-buttons">
        <router-link
          class="btn btn-primary btn-lg"
          :to="{
            name: 'advertModification',
            params: { id: activeAdvert.id }
          }"
          >Edit</router-link
        >
        <router-link
          :to="{
            name: 'advertsList'
          }"
        >
          <button class="btn btn-danger btn-lg" @click="deleteAdvert">
            Delete
          </button></router-link
        >
      </div>
      <router-link
        :to="{
          name: 'profileDetails',
          params: { id: activeAdvert.creatorsId }
        }"
      >
        <button class="btn btn-info btn-lg">
          Show Profile
        </button></router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    activeAdvert() {
      return this.$store.state.advertsModule.activeAdvert;
    },
    isAdvertOwner() {
      if (this.$store.state.userDataModule.activeUser !== null) {
        return this.$store.state.userDataModule.activeUser.registeredAdverts.includes(
          this.activeAdvert.id
        );
      } else return false;
    }
  },
  beforeCreate() {
    this.$store.dispatch("setActiveAdvert", this.$route.params.id);
  },
  destroyed() {
    this.$store.dispatch("deactivateAdvert");
  },
  methods: {
    deleteAdvert() {
      this.$store.dispatch("deleteAdvert", this.activeAdvert);
    }
  }
};
</script>

<style scoped>
.container {
  margin-top: 100px !important;
  padding: 30px;
}

#description-grid {
  width: 100%;
  display: grid;
  grid-template-columns: 3fr 1fr;
}

#main-text-column {
  grid-column-start: 1;
  grid-column-end: 2;
  border-top: 1px solid #e85a4f;
  padding-top: 30px;
  margin-top: 30px;
}

#key-info-column {
  grid-column-start: 2;
  grid-column-end: 3;
  display: flex;
  flex-direction: column;
  padding-left: 0px;
  margin-top: 24px;
  font-weight: 300;
  line-height: 2.5rem;
  font-size: 1rem;
}

#key-info-title {
  font-size: 2rem;
}

.side-info {
  border-left: 1px solid #e85a4f;
  margin-top: 6px;
  padding-left: 30px;
}

.side-info-line {
  background: #5f5f5d;
}

#side-info-container {
  padding: 20px 0px;
  border-top: 1px solid #5f5f5d;
  border-bottom: 1px solid #5f5f5d;
  width: 140px;
}

#contact-button-container {
  display: flex;
  justify-content: center;
}

#tech-stack {
  line-height: 1rem;
}

ul {
  margin-bottom: 8px;
}

.myBtn {
  border: 1px solid #8e8d8a;
  border-radius: 5px;
  margin-top: 18px;
  transition: all 100ms linear;
  font-size: 14px;
  height: 40px;
  width: 110px;
  color: #8e8d8a;
  background-color: #eae7dc;
  border: 1px solid #5f5f5d;
  color: #4b4b48;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.lead {
  white-space: pre-wrap;
}

.redline {
  background: #e85a4f !important;
}
</style>
