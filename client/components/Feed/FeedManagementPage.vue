<template>
  <main>
    <section v-if="$store.state.username">
      <CreateFeedForm />
    </section>
    <section v-else>
      <header>
        <h3>
          <router-link to="/login">Log in</router-link> to post freets and create custom feeds.
        </h3>
      </header>
    </section>
    <hr/>
    <section>
      <FeedComponent
        v-for="feed in $store.state.feeds instanceof Map ? $store.state.feeds.values() : []"
        :key="feed.name"
        :feed="feed"
      />
    </section>
    <hr/>
  </main>
</template>

<script>
import FeedComponent from '@/components/Feed/FeedComponent.vue';
import CreateFeedForm from '@/components/Feed/CreateFeedForm.vue';

export default {
  name: 'HomePage',
  components: {FeedComponent, CreateFeedForm},
  mounted() {
    this.$store.commit('setTitle', {title: 'Feeds', enableBack: false});
  },
};
</script>
  