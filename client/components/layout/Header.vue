<template>
  <header class="layout">
    <h1
      v-if="$store.state.enableBack"
      @click="() => $router.go(-1)"
      class="back"
    >
      ←
    </h1>
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
  display: flex;
  align-items: center;
  position: relative;
}

h1 {
  font-size: 2rem;
}

.back {
  cursor: pointer;
  text-align: center;
  width: 2.5rem;
  border: 1px dotted;
  border-radius: 1rem;
  margin-right: 1rem;
}

.alerts {
  width: 25%;
}
</style>
