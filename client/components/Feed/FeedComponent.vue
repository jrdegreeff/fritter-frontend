<template>
  <article class="feed">
    <header>
      <span class="name">
        {{ feed.name }}
      </span>
    </header>
    <div class="actions">
      <button v-if="feed.name !== 'Following'" @click="deleteFeed">
        🗑️ Delete
      </button>
      <button @click="viewFeed">
        👀 View
      </button>
    </div>
    <section class="alerts">
      <article
        v-for="(status, alert, index) in alerts"
        :key="index"
        :class="status"
      >
        <p>{{ alert }}</p>
      </article>
    </section>
  </article>
</template>

<script>
export default {
  name: 'FreetComponent',
  props: {
    feed: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      alerts: {}
    };
  },
  methods: {
    viewFeed() {
      this.$router.push(`/feeds/${this.feed.name}`);
    },
    deleteFeed() {
      const params = {
        method: 'DELETE',
        callback: () => {
          this.$store.commit('alert', {
            message: 'Successfully deleted feed!', status: 'success'
          });
        }
      };
      this.request(params);
    },
    async request(params) {
      const options = {
        method: params.method, headers: {'Content-Type': 'application/json'}
      };
      if (params.body) {
        options.body = params.body;
      }

      try {
        const r = await fetch(`/api/feeds/${this.feed.name}`, options);
        if (!r.ok) {
          const res = await r.json();
          throw new Error(res.error);
        }

        await this.$store.dispatch('refreshFeeds');

        params.callback();
      } catch (e) {
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    }
  }
};
</script>

<style scoped>
.feed {
  border: 1px solid #111;
  padding: 20px;
  position: relative;
  margin-bottom: -1px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.name {
  font-size: 1.2rem;
  font-weight: bold;
}
</style>
