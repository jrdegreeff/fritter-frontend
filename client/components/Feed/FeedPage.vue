<template>
  <main>
    <section>
      <header>
        <h2 v-if="$store.state.feeds instanceof Map && $store.state.feeds.has($route.params.name)">
          Viewing all freets in feed {{$route.params.name}}
        </h2>
        <h2 v-else>
          Feed {{$route.params.name}} doesn't exist!
        </h2>
      </header>
      <div v-if="$store.state.feeds instanceof Map && $store.state.feeds.has($route.params.name) && $store.state.feeds.get($route.params.name).freets.length">
        <FreetComponent
          v-for="freet in $store.state.feeds.get($route.params.name).freets"
          :key="freet.id"
          :freet="freet"
        />
      </div>
      <article v-else>
        <h3>No freets found.</h3>
      </article>
    </section>
    <hr/>
  </main>
</template>

<script>
import UserTag from '@/components/common/UserTag.vue';
import FreetComponent from '@/components/Freet/FreetComponent.vue';
import CreateFreetForm from '@/components/Freet/CreateFreetForm.vue';

export default {
  name: 'HomePage',
  components: {UserTag, FreetComponent, CreateFreetForm},
  mounted() {
    this.$store.commit('setTitle', {title: `${this.$route.params.name}`, enableBack: true});
  },
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
