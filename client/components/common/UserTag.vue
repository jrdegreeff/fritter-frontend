<template>
  <span>
      <router-link :to="`/user/${user}`">
        @{{ user }}
      </router-link>
  </span>
</template>

<script>
export default {
  name: 'UserTag',
  props: {
    user: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
span {
  font-size: 1.2rem;
  font-weight: bold;
  padding: 0.3rem 0.6rem;
  border: 1px solid;
  border-radius: 1.2rem;
}

span > a {
  text-decoration: none;
}
</style>
