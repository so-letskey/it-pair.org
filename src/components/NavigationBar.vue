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
        <li class="nav-item">
          <router-link :to="{ name: 'advertAddition' }" tag="a" class="nav-link"
            >Add</router-link
          >
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Account</a>
        </li>
      </ul>
    </div>
  </nav>
</template>
