<template>
  <div class="piano-container">
    <div class="piano">
      <div
        class="piano__white-key"
        v-for="note in whiteKeyWithBlack"
        :key="note.name"
        :class="{
          active: isSelected(note.name, note.octave),
          'piano__37-key': whiteKeyWithBlack.length === 22,
        }"
      >
        <div
          class="piano__black-key"
          v-if="note.blackKey"
          :key="note.blackKey.name"
          :class="{
            active: isSelected(note.blackKey.name, note.blackKey.octave),
          }"
        ></div>
        <!-- <span class="piano__note-name">{{ note.name }}</span> -->
      </div>
    </div>
  </div>
</template>
<script>
// import utils
import { generateNotesByRange } from "@/utils/notes";

export default {
  props: ["selectedNotes"],
  data() {
    return {
      notes: generateNotesByRange("C3", "C6"), // notes between C3 and C6
    };
  },
  methods: {
    isSelected(noteName, noteOctave) {
      if (this.selectedNotes.length === 0) return false;
      if (!noteName || !noteOctave) {
        throw new Error(
          `${noteName}${noteOctave} do not have note.name or note.octave`,
        );
      }

      // check the equality of note
      return this.selectedNotes.some(
        (selectedNote) =>
          selectedNote.name === noteName && selectedNote.octave === noteOctave,
      );
    },
  },
  computed: {
    whiteKeyWithBlack() {
      const whiteKeyNotes = this.notes.filter((note) => note.name.length === 1);
      // 目前的 whiteKeyNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B']

      const whiteKeyWithBlack = whiteKeyNotes.map((whiteKeyNote) => {
        // 因為黑鍵存在的位置是固定的，所以將 whiteKeyNotes 原始的 string 物件，讓白鍵綁定黑鍵
        // 陣列元素會變成 物件 e.g., {name: 'C', blackKey:'C#'} {name: B, blackKey: ''}

        if (whiteKeyNote.name !== "E" && whiteKeyNote.name !== "B") {
          return {
            name: whiteKeyNote.name,
            blackKey:
              this.notes[
                this.notes.findIndex(
                  (note) =>
                    whiteKeyNote.name === note.name &&
                    whiteKeyNote.octave === note.octave,
                ) + 1
              ],
            octave: whiteKeyNote.octave,
          };
        } else {
          return {
            name: whiteKeyNote.name,
            octave: whiteKeyNote.octave,
            blackKey: "",
          };
        }
      });
      // console.log(whiteKeyWithBlack);
      return whiteKeyWithBlack;
    },
  },
};
</script>

<style scoped lang="scss">
@import "../assets/customscss/variables";
// vraibles
// layout
$white-key-gap: 0.1rem;

// color
$key-lighten-green: rgb(156, 249, 17);

// style
.piano-container {
  width: 100%;
  background-color: rgb(2, 2, 24);
  color: #fff;
  height: 12rem; // 暫時 192px
  box-shadow: 0 1rem 2rem rgba(#000, 0.2);

  @media only screen and (max-width: 53.125em) {
    height: 9rem;
  }

  @media only screen and (max-width: 37.5em) {
    height: 7rem;
    width: 600px;
  }
}
.piano {
  display: flex;
  gap: $white-key-gap;
  height: 100%;

  &__white-key {
    background-color: #eee;
    height: 100%;
    position: relative;
    color: #000;
    text-align: center;

    transition: all 0.3s;

    // align the text
    display: grid;
    align-content: end;
    justify-content: center;
  }
  &__black-key {
    position: absolute;
    background-color: #000;
    width: 2rem; // 48px
    height: 65%;
    right: 0;
    top: 0;
    transform: translateX(50%);
    z-index: 10;

    transition: all 0.3s;

    @media only screen and (max-width: 53.125em) {
      // 850px
      width: 1.5rem;
    }

    @media only screen and (max-width: 37.5em) {
      width: 1.2rem;
    }
  }
  &__37-key {
    flex: 0 0 calc((100% - ($white-key-gap * 21)) / 22);
  }
  &__note-name {
  }
}

.active {
  background-color: #4caf50;
}
</style>
