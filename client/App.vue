<template>
  <div id="app">
    <NavBar />
    <div id="content">
      <Header />
      <!-- https://stackoverflow.com/questions/40404787/best-practice-for-reacting-to-params-changes-with-vue-router -->
      <router-view :key="$route.fullPath" />
      <Footer />
    </div>
    <SideBar />
  </div>
</template>

<script>
import NavBar from '@/components/layout/NavBar.vue';
import SideBar from '@/components/layout/SideBar.vue';
import Header from '@/components/layout/Header.vue';
import Footer from '@/components/layout/Footer.vue';

export default {
  name: 'App',
  components: {NavBar, SideBar, Header, Footer},
  beforeCreate() {
    // Sync stored username to current session
    fetch('/api/users/session', {
      credentials: 'same-origin' // Sends express-session credentials with request
    }).then(res => res.json()).then(async res => {
      const user = res.user;
      await this.$store.dispatch('setUser', user ? user.username : null);
    });

    // Clear alerts on page refresh
    this.$store.state.alerts = {};
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  height: 100vh;
  flex-direction: column;
  display: flex;
  padding: 0;
  margin: 0;
  font-size: 1.2em;
  color: #000;
  background-color: #D8E1E9;
}

.layout {
  background-color: #B3C5D7;
}

#app {
  flex-grow: 1;
  display: flex;
}

#app > .layout {
  padding: 1em 2em;
}

#app > .layout > section {
  padding: 1em 0em;
}

#content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

#content > .layout {
  padding: 2em 2em;
}

#content > main {
  flex-grow: 1;
  padding: 2em 2em;
}

section + hr {
  margin: 1rem 0;
  width: calc(100% + 2rem);
  transform: translateX(-1rem);
}

section > header {
  margin-bottom: 1rem;
}

section > header:last-child {
  margin-bottom: 0;
}

header > h1,
header > h2,
header > h3,
header > h4,
header > h5,
header > h6 {
  margin: 0;
}

a {
  color: inherit;
}

.alerts {
  position: absolute;
  z-index: 99;
  bottom: 0;
  top: 100%;
  left: 50%;
  transform: translate(-50%, 10%);
  width: 100%;
  text-align: center;
}

.alerts article {
  border-radius: 5px;
  padding: 10px 20px;
  color: #fff;
}

.alerts p {
  margin: 0;
}

.alerts .error {
  background-color: rgb(166, 23, 33);
}

.alerts .success {
  background-color: rgb(45, 135, 87);
}
</style>
