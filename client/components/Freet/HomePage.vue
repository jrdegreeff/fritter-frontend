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
            by <UserTag :user="$store.state.filter" />
          </span>
        </h2>
        <GetFreetsForm
          ref="getFreetsForm"
          value="author"
          placeholder="🔍 Filter by author (optional)"
          button="🔄 Get freets"
        />
      </header>
      <div v-if="$store.state.freets.length">
        <FreetComponent
          v-for="freet in $store.state.freets"
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
import GetFreetsForm from '@/components/Freet/GetFreetsForm.vue';

export default {
  name: 'HomePage',
  components: {UserTag, FreetComponent, GetFreetsForm, CreateFreetForm},
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
