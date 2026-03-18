<template>
  <div class="container-md">
    <!-- Chord Finder -->
    <div class="row mb-3 mt-5">
      <div class="col">
        <h1 class="text-center">{{ title[0] }}</h1>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <ChordSelector></ChordSelector>
      </div>
    </div>

    <!-- RandomNotesGenerator -->
    <div class="row mb-3 mt-5">
      <div class="col">
        <h1 class="text-center">{{ title[1] }}</h1>
      </div>
    </div>
    <div class="row">
      <div class="col">
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
      title: ["Chord Finder", "Random Notes Generator"],
    };
  },
};
</script>
<style lang="scss">
// html {
//   @media only screen and (max-width: 600px) {
//     font-size: 50%;
//   }
// }
</style>
<style scoped lang="scss">
.container {
  padding: 1rem;
}
</style>
