<template>
  <div class="chord-selector container-lg py-5">
    <div class="row">
      <h2 class="col mb-4 text-center">Chord Selector</h2>
    </div>
    <div class="row justify-content-center mb-sm-3 mb-md-4">
      <div class="col col-lg-6 col-md-7 col-sm-8">
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
                @change="updateSelectedNotes"
                class="form-select chord-selector__select"
              >
                <option disabled>Please choose a root note</option>
                <option
                  v-for="(note, index) in notesList"
                  :key="index"
                  :value="note"
                >
                  {{ note.name }}
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
                @change="updateSelectedNotes"
                class="form-select chord-selector__select"
              >
                <option disabled>Please choose a chord type</option>
                <option
                  v-for="(chordType, index) in chordTypes"
                  :key="index"
                  :value="chordType"
                >
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
            v-for="note in notesArranged"
            :key="note.name"
            v-if="notesArranged"
            class="chord-selector__selected-note fs-4"
          >
            {{ note.name }}
          </li>
        </ul>
      </div>
    </div>

    <div class="row justify-content-center">
      <div class="col col-xxl-10 col-piano">
        <PianoKeyBoard :selectedNotes="selectedNotes"></PianoKeyBoard>
      </div>
    </div>

    <!-- WHOLE NOTES IN PIANO TEST -->
  </div>
</template>

<script>
// import utils
import { triggerPolyNotes } from "@/utils/toneTirgger";
import { generateNotesByRange } from "@/utils/notes";

// import child component
import PianoKeyBoard from "../components/PianoKeyboard.vue";

export default {
  components: {
    PianoKeyBoard,
  },
  data() {
    return {
      notes: generateNotesByRange("C4", "C6"),
      selectedRoot: null,
      chordTypes: [
        { name: "major", interval: [4, 7] },
        { name: "minor", interval: [3, 7] },
        { name: "sus2", interval: [2, 7] },
        { name: "sus4", interval: [5, 7] },
        { name: "diminished", interval: [3, 6] },
        { name: "augmented", interval: [4, 8] },
      ],
      selectedChordType: null,
      selectedNotes: [],
      inversion: 0, // added in the future
    };
  },
  methods: {
    updateSelectedNotes() {
      if (!this.notesArranged) return;
      if (this.inversion === 0) {
        this.selectedNotes = [...this.notesArranged];
        triggerPolyNotes(this.selectedNotes);
      }
      // below are other inversions logic
    },
  },
  computed: {
    notesList() {
      // selected 12 notes in  octave 4
      return this.notes.filter((note) => note.octave === 4);
    },
    notesArranged() {
      // get notes arranged by selected chord type and root note.
      if (!this.selectedRoot || !this.selectedChordType) return;
      let notesArranged = [];

      notesArranged.push(this.selectedRoot);

      const intervalList = this.chordTypes.find(
        (chordType) => chordType.name === this.selectedChordType.name,
      ).interval;

      intervalList.forEach((interval) =>
        notesArranged.push(
          this.notes[
            this.notes.findIndex(
              (note) =>
                note.name === this.selectedRoot.name &&
                note.octave === this.selectedRoot.octave,
            ) + interval
          ],
        ),
      );

      return notesArranged;
    },
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
    background-color: #4caf50;
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
.col-piano {
  @media only screen and (max-width: 37.5em) {
    // height: 4rem;
    overflow: scroll;
  }
}
</style>
