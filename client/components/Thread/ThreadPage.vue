<template>
  <main v-if="freet._id">
    <section v-if="lineage.length">
      <header>
        <h2>
          Thread
        </h2>
      </header>
      <FreetComponent
        v-for="freet in lineage"
        :key="freet.id"
        :freet="freet"
      />
    </section>
    <hr v-if="lineage.length" />
    <section>
      <header>
        <h2>
          Freet
        </h2>
      </header>
      <FreetComponent
        :freet="freet"
      />
    </section>
    <hr/>
    <section v-if="children.length">
      <header>
        <h2>
          Replies
        </h2>
      </header>
      <FreetComponent
        v-for="freet in children"
        :key="freet.id"
        :freet="freet"
      />
    </section>
    <hr v-if="children.length" />
  </main>
</template>
  
<script>
import FreetComponent from '@/components/Freet/FreetComponent.vue';
import CreateFreetForm from '@/components/Freet/CreateFreetForm.vue';

export default {
  name: 'ThreadPage',
  components: {FreetComponent, CreateFreetForm},
  data() {
    return {
      lineage: [],
      freet: {},
      children: []
    };
  },
  methods: {
    async getThread() {
      const url = `api/threads?freetId=${this.$route.params.freetid}`;
      try {
        const r = await fetch(url);
        const res = await r.json();
        if (!r.ok) {
          throw new Error(res.error);
        }
          
        this.lineage = res.lineage;
        this.freet = res.freet;
        this.children = res.children;
      } catch (e) {
        this.$store.commit('alert', {message: e, status: 'error'});
      }
    }
  },
  async mounted() {
    this.$store.commit('setTitle', {title: 'Thread', enableBack: true});
    await this.getThread();
  }
};
</script>
  