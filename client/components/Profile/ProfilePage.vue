<template>
  <main v-if="user">
    <section>
      <header>
        <h1>
          @{{user}}
        </h1>
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
        this.followers = res.followers.concat(["TEST1", "TEST2"]);
        this.following = res.following.concat(["TEST3", "TEST4"]);
      } catch (e) {
        this.$store.commit('alert', {message: e, status: 'error'});
      }
    }
  },
  async mounted() {
    this.$store.commit('setTitle', {title: 'Profile', enableBack: true});
    await this.getFollows();
  }
};
</script>

<style scoped>
  span {
    margin-right: 1rem;
  }
</style>