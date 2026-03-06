<!-- 
 notes: ["C",
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
        "B",] 
-->
<template>
  <!-- <div>{{ selectedNotes }}</div> -->
  <div class="piano-container">
    <div class="piano">
      <div
        class="piano__white-key"
        v-for="note in whiteKeyNote"
        :key="note"
        :id="note"
        :class="{ active: this.selectedNotes.includes(note) }"
      >
        <div
          class="piano__black-key"
          v-if="note !== 'E' && note !== 'B'"
          :key="notes[notes.findIndex((curNote) => curNote === note) + 1]"
          :id="notes[notes.findIndex((curNote) => curNote === note) + 1]"
          :class="{
            active: this.selectedNotes.includes(
              notes[notes.findIndex((curNote) => curNote === note) + 1],
            ),
          }"
        ></div>
        {{ note }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["selectedNotes", "notes"],
  data() {
    return {
      isActive: true,
    };
  },
  methods: {},
  computed: {
    whiteKeyNote() {
      return this.notes.filter((note) => note.length === 1);
    },
  },
};
</script>
<style scoped lang="scss">
// variables
$white-key-gap: 0.2rem;

// style
.piano-container {
  // width: 516px
  background-color: rgb(10, 10, 85);
  color: #fff;
  height: 20rem; // 暫時 320px
  // border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 1rem 2rem rgba(#000, 0.1);
}
.piano {
  display: flex;
  gap: $white-key-gap;
  height: 100%;

  &__white-key {
    background-color: #eee;
    flex: 0 0 calc((100% - ($white-key-gap * 6)) / 7);
    height: 100%;
    position: relative;
    color: #000;
    text-align: center;
  }
  &__black-key {
    position: absolute;
    background-color: #000;
    width: 3rem; // 48px
    height: 65%;
    right: 0;
    top: 0;
    transform: translateX(50%);
    z-index: 10;
  }
}

.active {
  background-color: greenyellow;
}
</style>
