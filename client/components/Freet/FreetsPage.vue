<!-- Default page that also displays freets -->

<template>
  <main>
    <section v-if="$store.state.username">
      <CreateFreetForm />
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
      <header>
        <h2>
          Viewing all freets
          <span v-if="$store.state.filter">
            by @{{ $store.state.filter }}
          </span>
        </h2>
        <GetFreetsForm
          ref="getFreetsForm"
          value="author"
          placeholder="🔍 Filter by author (optional)"
          button="🔄 Get freets"
        />
      </header>
      <section
        v-if="$store.state.freets.length"
      >
        <FreetComponent
          v-for="freet in $store.state.freets"
          :key="freet.id"
          :freet="freet"
        />
      </section>
      <article
        v-else
      >
        <h3>No freets found.</h3>
      </article>
    </section>
    <hr/>
  </main>
</template>

<script>
import FreetComponent from '@/components/Freet/FreetComponent.vue';
import CreateFreetForm from '@/components/Freet/CreateFreetForm.vue';
import GetFreetsForm from '@/components/Freet/GetFreetsForm.vue';

export default {
  name: 'FreetPage',
  components: {FreetComponent, GetFreetsForm, CreateFreetForm},
  mounted() {
    this.$store.commit('setTitle', {title: 'Home', enableBack: false});
    this.$refs.getFreetsForm.submit();
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
