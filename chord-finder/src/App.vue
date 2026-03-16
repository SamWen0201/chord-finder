<template>
  <div class="container-md">
    <div class="row mb-3 mt-5">
      <div class="col">
        <h1 class="text-center">{{ title }}</h1>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <ChordSelector></ChordSelector>
        <RandomNotesGenerator></RandomNotesGenerator>
      </div>
    </div>
  </div>
</template>

<script>
import ChordSelector from "./components/ChordSelector.vue";
import RandomNotesGenerator from "./components/RandomNotesGenerator.vue";

export default {
  components: {
    ChordSelector,
    RandomNotesGenerator,
  },
  data() {
    return {
      title: "Chord Finder",
    };
  },
};
</script>
<style>
/* html {
  @media only screen and (max-width: 600px) {
    font-size: 50%;
  }
} */
</style>
<style scoped lang="scss">
.container {
  padding-top: 1rem;
}
</style>
