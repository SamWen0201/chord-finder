<template>
  <div class="container">
    <h1>{{ title }}</h1>
    <ChordSelector></ChordSelector>
  </div>
</template>

<script>
import ChordSelector from "./components/ChordSelector.vue";

export default {
  components: {
    ChordSelector,
  },
  data() {
    return {
      title: "Chord Finder",
    };
  },
};
</script>

<style scoped lang="scss">
.container {
  padding-top: 1rem;
}
</style>
