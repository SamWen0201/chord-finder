<template>
  <div class="chord-selector container">
    <div class="row justify-content-center mb-sm-3 mb-md-4">
      <div class="col col-lg-6">
        <!-- Chord Selector Form -->
        <form class="chord-selector__form mb-3">
          <div class="row mb-3">
            <label for="selectedRoot" class="col-sm-4 col-form-label"
              >root note:</label
            >
            <div class="col-sm-8">
              <select
                v-model="selectedRoot"
                id="selectedRoot"
                @change="updateChord"
                class="form-select chord-selector__select"
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
                class="form-select chord-selector__select"
              >
                <option disabled value>Please choose a chord type</option>
                <option v-for="(chordType, index) in chordTypes" :key="index">
                  {{ chordType.name }}
                </option>
              </select>
            </div>
          </div>
        </form>
      </div>
    </div>

    <div class="row mb-5">
      <div
        class="col text-center d-flex justify-content-center align-items-center"
      >
        <span class="text-body-tertiary">Notes in chord:</span>
        <ul class="chord-selector__selected-notes-list list-unstyled">
          <li
            v-for="selectedNote in selectedNotes"
            :key="selectedNote"
            v-if="selectedNotes"
            class="chord-selector__selected-note fs-4"
          >
            {{ selectedNote }}
          </li>
        </ul>
      </div>
    </div>

    <div class="row justify-content-center">
      <div class="col col-xl-7 col-lg-8 col-xxl-6">
        <PianoKeyBoard
          :selectedNotes="selectedNotes"
          :notes="notes"
        ></PianoKeyBoard>
      </div>
    </div>
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
        { name: "diminished", interval: [3, 6] },
        { name: "augmented", interval: [4, 8] },
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
@import "../assets/customscss/variables";
.chord-selector {
  &__result {
    font-size: 1.6rem;
  }
  &__select {
  }

  &__selected-notes-list {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;

    //
    margin: 0;
    margin-left: 1rem;
  }
  &__selected-note {
    background-color: $primary;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2.8rem;
    height: 2.8rem;
    border-radius: 50%;
    box-shadow: 0 1rem 2rem rgba(#000, 0.2);
  }
}
</style>
