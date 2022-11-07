<template>
  <header>
    <h1> {{ $store.state.title }} </h1>
    <section class="alerts">
      <article
        v-for="(status, alert, index) in $store.state.alerts"
        :key="index"
        :class="status"
      >
        <p>{{ alert }}</p>
      </article>
    </section>
  </header>
</template>

<style scoped>
header {
  padding: 2em 2em;
  background-color: #ccc;
  display: flex;
  align-items: center;
  position: relative;
}

h1 {
  font-size: 2rem;
}

.alerts {
    width: 25%;
}
</style>
