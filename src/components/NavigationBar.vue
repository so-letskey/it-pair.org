<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link class="navbar-brand" :to="{ name: 'welcomePage' }" tag="a"
      ><strong>IT</strong>Pair</router-link
    >
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div id="navbarSupportedContent" class="collapse navbar-collapse">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item active">
          <router-link :to="{ name: 'welcomePage' }" tag="a" class="nav-link"
            >Home</router-link
          >
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'advertsList' }" tag="a" class="nav-link"
            >Search</router-link
          >
        </li>
        <li v-if="!this.$store.state.userDataModule.signedUp" class="nav-item">
          <router-link
            :to="{ name: 'advertAddition' }"
            tag="a"
            class="nav-link disabled"
            >Add disabled</router-link
          >
        </li>
        <li v-if="this.$store.state.userDataModule.signedUp" class="nav-item">
          <router-link :to="{ name: 'advertAddition' }" tag="a" class="nav-link"
            >Add ok</router-link
          >
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'userSignIn' }" tag="a" class="nav-link"
            >SignIn</router-link
          >
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'userSignUp' }" tag="a" class="nav-link"
            >SignUp</router-link
          >
        </li>
      </ul>
    </div>
  </nav>
</template>
