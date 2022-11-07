<!-- A basic navigation bar component -->
<!-- Example of a component which is included on all pages (via App.vue) -->
<!-- This navbar takes advantage of both flex and grid layouts for positioning elements; feel free to redesign as you see fit! -->

<template>
  <nav>
    <router-link to="/">
      <div class="logo">
        <img src="../../public/logo.svg">
        <h1> Fritter </h1>
      </div>
    </router-link>
    <router-link
      v-if="$store.state.username"
      to="/account"
    >
      @{{ $store.state.username }}
    </router-link>
    <router-link
      v-else
      to="/login"
    >
      Log in
    </router-link>
  </nav>
</template>

<style scoped>
nav {
  background-color: #ccc;
  display: flex;
  flex-direction: column;
  align-items: center;
}

nav > * {
  padding: 2em 0em;
}

.logo {
	display: flex;
	align-items: center;
}

.logo img {
  height: 32px;
}

.logo h1 {
  font-size: 32px;
  margin: 0 5px;
}
</style>
