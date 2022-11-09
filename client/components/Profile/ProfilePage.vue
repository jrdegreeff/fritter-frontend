<template>
  <main v-if="user">
    <section>
      <header>
        <h1>
          @{{user}}
        </h1>
        <button
          v-if="$store.state.username && $store.state.following instanceof Set && !$store.state.following.has(user)"
          @click="follow"
        >
          Follow
        </button>
        <button
          v-if="$store.state.username && $store.state.following instanceof Set && $store.state.following.has(user)"
          @click="unfollow"
        >
          Unfollow
        </button>
      </header>
    </section>
    <hr/>
    <section>
      <header>
        <h2>
          Followers ({{followers.length}})
        </h2>
      </header>
      <UserTag
        v-for="user in followers"
        :key="user"
        :user="user"
      />
    </section>
    <hr/>
    <section>
      <header>
        <h2>
          Following ({{following.length}})
        </h2>
      </header>
      <UserTag
        v-for="user in following"
        :key="user"
        :user="user"
      />
    </section>
    <hr/>
  </main>
</template>
  
<script>
import UserTag from '@/components/common/UserTag.vue';

export default {
  name: 'ProfilePage',
  components: {UserTag},
  data() {
    return {
      user: "",
      followers: [],
      following: []
    };
  },
  methods: {
    async getFollows() {
      const url = `api/follows?username=${this.$route.params.username}`;
      try {
        const r = await fetch(url);
        const res = await r.json();
        if (!r.ok) {
          throw new Error(res.error);
        }
        
        this.user = res.user;
        this.followers = res.followers;
        this.following = res.following;
      } catch (e) {
        this.$store.commit('alert', {message: e, status: 'error'});
      }
    },
    async follow() {
      await this.$store.dispatch('follow', this.user);
      await this.getFollows();
    },
    async unfollow() {
      await this.$store.dispatch('unfollow', this.user);
      await this.getFollows();
    }
  },
  async mounted() {
    this.$store.commit('setTitle', {title: 'Profile', enableBack: true});
    await this.getFollows();
  }
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

span {
  margin-right: 1rem;
}
</style>