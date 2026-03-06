<template>
  <h1>{{ title }}</h1>
  <ChordSelector></ChordSelector>
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

<style></style>
