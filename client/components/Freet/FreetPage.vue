<template>
  <main>
    <section>
      <FreetComponent :freet="freet" />
    </section>
    <hr/>
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
  </main>
</template>

<script>
import FreetComponent from '@/components/Freet/FreetComponent.vue';
import CreateFreetForm from '@/components/Freet/CreateFreetForm.vue';

export default {
  name: 'FreetPage',
  components: {FreetComponent, CreateFreetForm},
  data() {
    return {
      freet: {}
    };
  },
  methods: {
    async getFreet() {
      const url = `api/freets/${this.$route.params.freetid}`;
      try {
        const r = await fetch(url);
        const res = await r.json();
        if (!r.ok) {
          throw new Error(res.error);
        }
        
        this.freet = res.freet;
      } catch (e) {
        this.$store.commit('alert', {message: e, status: 'error'});
      }
    }
  },
  async mounted() {
    await this.getFreet();
    this.$store.commit('setTitle', `Freet by @${this.freet.author}`);
  },
};
</script>
