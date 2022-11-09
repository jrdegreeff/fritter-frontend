import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

/**
 * Storage for data that needs to be accessed from various compoentns.
 */
const store = new Vuex.Store({
  state: {
    title: "",
    enableBack: false,
    filter: null, // Username to filter shown freets by (null = show all)
    freets: [], // All freets created in the app
    username: null, // Username of the logged in user
    following: new Set(),
    feeds: new Map(),
    alerts: {} // global success/error messages encountered during submissions to non-visible forms
  },
  mutations: {
    setTitle(state, payload) {
      state.title = payload.title;
      state.enableBack = payload.enableBack;
    },
    alert(state, payload) {
      /**
       * Add a new message to the global alerts.
       */
      Vue.set(state.alerts, payload.message, payload.status);
      setTimeout(() => {
        Vue.delete(state.alerts, payload.message);
      }, 3000);
    },
    setUsername(state, username) {
      /**
       * Update the stored username to the specified one.
       * @param username - new username to set
       */
      state.username = username;
    },
    updateFollowing(state, following) {
      state.following = following;
    },
    follow(state, user) {
      state.following.add(user);
    },
    unfollow(state, user) {
      state.following.delete(user);
    },
    updateFeeds(state, feeds) {
      state.feeds = feeds;
    },
    updateFilter(state, filter) {
      /**
       * Update the stored freets filter to the specified one.
       * @param filter - Username of the user to fitler freets by
       */
      state.filter = filter;
    },
    updateFreets(state, freets) {
      /**
       * Update the stored freets to the provided freets.
       * @param freets - Freets to store
       */
      state.freets = freets;
    }
  },
  actions: {
    async setUser({commit, dispatch}, username) {
      commit('setUsername', username);
      await dispatch('refreshFollowing');
      await dispatch('refreshFeeds');
    },
    async follow({commit, dispatch}, user) {
      commit('follow', user);
      const r = await fetch('api/follows', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username: user})
      });
      const res = await r.json();
      if (!r.ok) {
        commit('alert', {message: res.error, status: 'error'});
      } else {
        await dispatch('refreshFeeds');
      }
    },
    async unfollow({commit, dispatch}, user) {
      commit('unfollow', user);
      const r = await fetch(`api/follows/${user}`, {
        method: 'DELETE'
      });
      const res = await r.json();
      if (!r.ok) {
        commit('alert', {message: res.error, status: 'error'});
      } else {
        await dispatch('refreshFeeds');
      }
    },
    async refreshFollowing({commit, state}) {
      if (state.username) {
        const url = `/api/follows?username=${state.username}`;
        const res = await fetch(url).then(async r => r.json());
        commit('updateFollowing', new Set(res.following));
      } else {
        commit('updateFollowing', new Set());
      }
    },
    async updateFeed({commit, dispatch}, {user, name, action}) {
      const add = action ? [user] : [];
      const remove = action ? [] : [user];
      const r = await fetch(`api/feeds/${name}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({add, remove})
      });
      const res = await r.json();
      if (!r.ok) {
        commit('alert', {message: res.error, status: 'error'});
      } else {
        if (name === 'Following') {
          await dispatch('refreshFollowing');
        }
        await dispatch('refreshFeeds');
      }
    },
    async refreshFeeds({commit, state}) {
      if (state.username) {
        const url = `/api/feeds`;
        const res = await fetch(url).then(async r => r.json());
        commit('updateFeeds', new Map(res.map(f => [f.name, f])));
      } else {
        commit('updateFeeds', new Map());
      }
    },
    async refreshFreets({commit, state}) {
      /**
       * Request the server for the currently available freets.
       */
      const url = state.filter ? `/api/users/${state.filter}/freets` : '/api/freets';
      const res = await fetch(url).then(async r => r.json());
      commit('updateFreets', res);
    }
  },
  // Store data across page refreshes, only discard on browser close
  plugins: [createPersistedState()]
});

export default store;
