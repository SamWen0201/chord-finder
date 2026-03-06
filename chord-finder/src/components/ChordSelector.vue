<template>
  <div>{{ selectedRoot }} {{ selectedChordType }}</div>
  <h2>{{ selectedChord }}</h2>

  <form class="form">
    <label for="selectedRoot">root note:</label>
    <select v-model="selectedRoot" id="selectedRoot" @change="updateChord">
      <option disabled value>Please choose a root note</option>
      <option v-for="(rootNote, index) in rootNotes" :key="index">
        {{ rootNote }}
      </option>
    </select>

    <label for="selectedChordType">chord type:</label>
    <select
      v-model="selectedChordType"
      id="selectedChordType"
      @change="updateChord"
    >
      <option disabled value>Please choose a chord type</option>
      <option v-for="(chordType, index) in chordTypes" :key="index">
        {{ chordType }}
      </option>
    </select>
  </form>
</template>

<script>
export default {
  data() {
    return {
      rootNotes: [
        "C",
        "C#",
        "D",
        "D#",
        "E",
        "F",
        "F#",
        "G",
        "G#",
        "A",
        "A#",
        "B",
      ],
      selectedRoot: "C",
      chordTypes: ["major", "minor", "sus2", "sus4"],
      selectedChordType: "major",
      selectedChord: "CEG",
    };
  },
  methods: {
    updateChord() {
      // 以目前選取的 根音為起點 加上和弦種類對應的 interval 獲得想要的和弦
      const first = this.rootNotes.findIndex(
        (note) => this.selectedRoot === note,
      );

      if (this.selectedChordType === "major") {
        const third =
          first + 4 >= this.rootNotes.length
            ? first + 4 - this.rootNotes.length
            : first + 4;
        const fifth =
          first + 7 >= this.rootNotes.length
            ? first + 7 - this.rootNotes.length
            : first + 7;

        this.selectedChord =
          this.rootNotes[first] + this.rootNotes[third] + this.rootNotes[fifth];
      }
      if (this.selectedChordType === "minor") {
        const third =
          first + 3 >= this.rootNotes.length
            ? first + 3 - this.rootNotes.length
            : first + 3;
        const fifth =
          first + 7 >= this.rootNotes.length
            ? first + 7 - this.rootNotes.length
            : first + 7;

        this.selectedChord =
          this.rootNotes[first] + this.rootNotes[third] + this.rootNotes[fifth];
      }
      if (this.selectedChordType === "sus2") {
        const third =
          first + 2 >= this.rootNotes.length
            ? first + 2 - this.rootNotes.length
            : first + 2;
        const fifth =
          first + 7 >= this.rootNotes.length
            ? first + 7 - this.rootNotes.length
            : first + 7;

        this.selectedChord =
          this.rootNotes[first] + this.rootNotes[third] + this.rootNotes[fifth];
      }
      if (this.selectedChordType === "sus4") {
        const third =
          first + 5 >= this.rootNotes.length
            ? first + 5 - this.rootNotes.length
            : first + 5;
        const fifth =
          first + 7 >= this.rootNotes.length
            ? first + 7 - this.rootNotes.length
            : first + 7;

        this.selectedChord =
          this.rootNotes[first] + this.rootNotes[third] + this.rootNotes[fifth];
      }
      console.log("Update Chord: " + this.selectedChord);
    },
  },

  computed: {
    chord() {},
  },
};
</script>

<style></style>
