<template>
  <nav class="layout">
    <section>
      <router-link to="/">
        <Logo />
      </router-link>
    </section>
    <hr/>
    <section>
      <header>
        <h3>
          <router-link to="/feeds">
            Feeds
          </router-link>
        </h3>
        <ul>
          <li
            v-for="feed in $store.state.feeds instanceof Map ? $store.state.feeds.keys() : []"
            :key="feed"
          >
            <router-link :to="`/feeds/${feed}`">
              {{feed}}
            </router-link>
          </li>
        </ul>
      </header>
    </section>
    <hr/>
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

ul {
  list-style-type: none;
  padding: 0;
}
</style>
