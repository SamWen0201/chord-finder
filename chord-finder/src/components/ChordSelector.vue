<template>
  <div class="chord-selector container">
    <!-- Chord Selector Form -->
    <form class="form mb-5">
      <div class="row mb-3">
        <label for="selectedRoot" class="col-sm-4 col-form-label"
          >root note:</label
        >
        <div class="col-sm-8">
          <select
            v-model="selectedRoot"
            id="selectedRoot"
            @change="updateChord"
            class="form-selector form-control"
          >
            <option disabled value>Please choose a root note</option>
            <option v-for="(note, index) in notes" :key="index">
              {{ note }}
            </option>
          </select>
        </div>
      </div>
      <div class="row mb-3">
        <label for="selectedChordType" class="col-sm-4 col-form-label"
          >chord type:</label
        >
        <div class="col-sm-8">
          <select
            v-model="selectedChordType"
            id="selectedChordType"
            @change="updateChord"
            class="form-selector form-control"
          >
            <option disabled value>Please choose a chord type</option>
            <option v-for="(chordType, index) in chordTypes" :key="index">
              {{ chordType.name }}
            </option>
          </select>
        </div>
      </div>
    </form>
    <!-- <p class="chord-selector__result">
      The {{ selectedRoot }} {{ selectedChordType }} chord is
      {{ selectedChord }}
    </p> -->
    <PianoKeyBoard
      :selectedNotes="selectedNotes"
      :notes="notes"
    ></PianoKeyBoard>
  </div>
</template>

<script>
import PianoKeyBoard from "../components/PianoKeyboard.vue";

export default {
  components: {
    PianoKeyBoard,
  },
  data() {
    return {
      notes: ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"],
      selectedRoot: "C",
      chordTypes: [
        { name: "major", interval: [4, 7] },
        { name: "minor", interval: [3, 7] },
        { name: "sus2", interval: [2, 7] },
        { name: "sus4", interval: [5, 7] },
      ],
      selectedChordType: "major",
      selectedNotes: ["C", "E", "G"],
    };
  },
  methods: {
    updateChord() {
      // 以目前選取的 根音為起點 加上和弦種類對應的 interval 獲得想要的和弦
      const first = this.notes.findIndex((note) => this.selectedRoot === note);

      // choose the right chord in chordTypes[]
      const selectedChord = this.chordTypes.find(
        (chordType) => this.selectedChordType === chordType.name,
      );

      this.selectedNotes[0] = this.selectedRoot;
      this.selectedNotes[1] =
        this.notes[(first + selectedChord.interval[0]) % 12];
      this.selectedNotes[2] =
        this.notes[(first + selectedChord.interval[1]) % 12];
    },
  },

  computed: {
    chord() {},
  },
};
</script>

<style scoped lang="scss">
.chord-selector {
  &__result {
    font-size: 1.6rem;
  }
}
</style>
