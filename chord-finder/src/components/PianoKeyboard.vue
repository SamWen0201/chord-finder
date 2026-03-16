<template>
  <div class="piano-container">
    <div class="piano">
      <div
        class="piano__white-key"
        v-for="note in whiteKeyNotesOb"
        :key="note.name"
        :class="{ active: selectedNotes.includes(note.name) }"
      >
        <div
          class="piano__black-key"
          v-if="note.blackKey"
          :key="note.blackKey"
          :class="{
            active: selectedNotes.includes(note.blackKey),
          }"
        ></div>
        <!-- <span class="piano__note-name">{{ note.name }}</span> -->
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
    whiteKeyNotesOb() {
      const whiteKeyNotes = this.notes.filter((note) => note.length === 1);
      // 目前的 whiteKeyNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B']

      const whiteKeyNotesOb = whiteKeyNotes.map((whiteKeyNote) => {
        // 因為黑鍵存在的位置是固定的，所以將 whiteKeyNotes 原始的 string 物件，讓白鍵綁定黑鍵
        // 陣列元素會變成 物件 e.g., {name: 'C', blackKey:'C#'} {name: B, blackKey: ''}

        if (whiteKeyNote !== "E" && whiteKeyNote !== "B") {
          return {
            name: whiteKeyNote,
            blackKey:
              this.notes[
                this.notes.findIndex((note) => whiteKeyNote === note) + 1
              ],
          };
        } else {
          return {
            name: whiteKeyNote,
            blackKey: "",
          };
        }
      });
      return whiteKeyNotesOb;
    },
  },
};
</script>

<style scoped lang="scss">
@import "../assets/customscss/variables";
// vraibles
// layout
$white-key-gap: 0.2rem;

// color
$key-lighten-green: rgb(156, 249, 17);

// style
.piano-container {
  width: 35rem; // 540px
  background-color: rgb(2, 2, 24);
  color: #fff;
  height: 15rem; // 暫時 320px
  // border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 1rem 2rem rgba(#000, 0.2);

  @media only screen and (max-width: 600px) {
    height: 10rem;
  }
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

    transition: all 0.3s;

    // align the text
    display: grid;
    align-content: end;
    justify-content: center;
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

    transition: all 0.3s;

    @media only screen and (max-width: 600px) {
      width: 2rem;
    }
  }
  &__note-name {
  }
}

.active {
  background-color: $primary;
}
</style>
