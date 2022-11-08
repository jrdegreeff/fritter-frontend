<template>
  <aside class="layout">
    <section>
      <Logo />
    </section>
  </aside>
</template>

<script>
import Logo from '@/components/common/Logo.vue';

export default {
  name: 'SideBar',
  components: {Logo}
};
</script>

<style scoped>
.logo {
  visibility: hidden;
}
</style>
