<template>
  <div id="app">
    <div id="app-row">
      <NavBar />
      <div id="content">
        <Header />
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/common/Header.vue';
import NavBar from '@/components/common/NavBar.vue';

export default {
  name: 'App',
  components: {Header, NavBar},
  beforeCreate() {
    // Sync stored username to current session
    fetch('/api/users/session', {
      credentials: 'same-origin' // Sends express-session credentials with request
    }).then(res => res.json()).then(res => {
      const user = res.user;
      this.$store.commit('setUsername', user ? user.username : null);
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
}

#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

#app-row {
  display: flex;
  flex-grow: 1;
}

#content {
  flex-grow: 1;
}

nav {
  padding: 0em 2em;
}

main {
  padding: 2em 2em;
}

section + hr {
  margin: 1rem 0;
  width: 102%;
  transform: translateX(-1%);
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
