<template>
  <nav class="layout">
    <section>
      <router-link to="/">
        <Logo />
      </router-link>
    </section>
    <hr/>
    <section v-if="$store.state.username">
      <header>
        <h3>
          <router-link to="/feeds">
            Feeds
          </router-link>
        </h3>
      </header>
      <ul v-if="$store.state.feeds.size">
        <hr/>
        <li
          v-for="feed in $store.state.feeds instanceof Map ? $store.state.feeds.keys() : []"
          :key="feed"
        >
          <router-link :to="`/feeds/${feed}`">
            {{feed}}
          </router-link>
          <hr/>
        </li>
      </ul>
    </section>
    <hr v-if="$store.state.username"/>
    <section v-if="$store.state.username">
      <header>
        <h3>
          <router-link to="/account">
            Account
          </router-link>
        </h3>
      </header>
      <UserTag :user="$store.state.username" />
    </section>
    <section v-else>
      <router-link to="/login">
        Log in
      </router-link>
    </section>
    <hr/>
  </nav>
</template>

<script>
import Logo from '@/components/common/Logo.vue';
import UserTag from '@/components/common/UserTag.vue';

export default {
  name: 'NavBar',
  components: {Logo, UserTag}
};
</script>

<style scoped>
section {
  text-align: center;
}

header {
  margin-bottom: 1.5rem;
}

ul {
  list-style-type: none;
  padding: 1rem;
  border: 1px dotted;
}

li {
  margin: 0.5rem 0rem;
}
</style>
