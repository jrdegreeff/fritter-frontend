<template>
  <nav class="layout">
    <section>
      <router-link to="/">
        <Logo />
      </router-link>
    </section>
    <hr/>
    <section>
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
    </section>
  </nav>
</template>

<script>
import Logo from '@/components/common/Logo.vue';

export default {
  name: 'NavBar',
  components: {Logo}
};
</script>

<style scoped>
section {
  text-align: center;
}
</style>
