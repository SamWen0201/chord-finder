<template>
  <div class="randomNotesGenerator container text-center py-5">
    <div class="row">
      <h2 class="col mb-4">Random Notes Generator</h2>
    </div>
    <div class="row mb-3">
      <div class="col">
        <div class="card randomNotesGenerator__question mx-auto">
          <div class="card-body d-flex gap-2">
            <button
              v-if="status"
              type="button"
              @click="triggerPolyNotes(currentNotes.notesObj)"
              class="btn btn-primary btn--music"
            >
              <Music /> Play
            </button>
            <button
              v-if="status"
              type="button"
              @click="changeCurrentNotes"
              class="btn btn-outline-secondary"
            >
              <SkipForward /> Next
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Answer input and answer buttons -->
    <div class="row mb-5">
      <div class="col">
        <form @submit.prevent="answer().submit" v-if="status">
          <div class="row">
            <div class="col">
              <div
                v-if="status === 'correct'"
                class="alert alert-success alert-dismissible mb-2"
              >
                ✅ Correct!
              </div>

              <div
                v-if="status === 'wrong'"
                class="alert alert-danger alert-dismissible mb-2"
              >
                ❌ Wrong, try again!
              </div>
              <input
                v-model="ansNotesString"
                readonly
                class="form-control mb-2"
                id="ansNotesString"
              />
              <div
                class="d-flex gap-2 justify-content-center"
                role="group"
                aria-label="Answer-relation buttons"
              >
                <button
                  type="button"
                  @click="answer().clear"
                  :disabled="status === 'correct'"
                  class="btn btn-outline-secondary"
                >
                  <Trash />
                </button>
                <button
                  type="submit"
                  :disabled="status === 'correct'"
                  class="btn btn-outline-secondary"
                >
                  <Send />
                </button>
                <button
                  type="button"
                  @click="triggerPolyNotes(ansNotes)"
                  class="btn btn-outline-secondary"
                >
                  <Play />
                </button>
              </div>

              <!-- <div class="ml-5">the answer is {{ status }}</div> -->
            </div>
          </div>
        </form>
      </div>
    </div>

    <!-- notesBtnContainer -->
    <div class="row">
      <div class="col d-flex gap-4 justify-content-center align-items-center">
        <!-- octave up-->
        <button
          type="button"
          @click="updateNotesBtn().down"
          class="btn btn-outline-secondary btn-sm"
        >
          <ChevronLeft />
        </button>

        <!-- notesBtn -->
        <div class="notesBtnContainer" v-if="status">
          <ul class="notesBtnContainer__list">
            <li v-for="noteObj in currentNotesBtn.notesObj">
              <button
                type="button"
                @click="answer(noteObj).answer"
                class="btn btn--notes"
              >
                {{ noteObj.name }}
              </button>
            </li>
          </ul>
        </div>

        <!-- octave down -->
        <button
          type="button"
          @click="updateNotesBtn().up"
          class="btn btn-outline-secondary btn-sm"
        >
          <ChevronRight />
        </button>
      </div>

      <div class="row mt-3 mx-auto">
        <div class="col">
          <p class="text-center text-secondary">
            Octave: {{ currentNotesBtn.octave }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {
  Send,
  Play,
  Trash,
  Music,
  SkipForward,
  ChevronLeft,
  ChevronRight,
} from "lucide-vue-next";
</script>
<script>
// Import Notes logic relation functions
import {
  WHOLE_PIANO_NOTES,
  getRandomNotes,
  generateNotesByOctave,
} from "../utils/notes";

// import tone.js library
import * as Tone from "tone";

export default {
  mounted() {
    this.initNotesBtn();
    console.log("Initialize Notes button on the page");
  },

  data() {
    return {
      typeOfNotes: WHOLE_PIANO_NOTES, // < WHOLE_PIANO_NOTES || generateNotesByOctaveRange() ||  generateNotesByRange()
      currentNotes: {
        type: "", // < ’’ || ‘major’ || ‘minor’ || ‘sus2’ || … >”, 空字串代表目前沒有選擇和弦類型（因為是屬於隨機）
        amount: 1,
        notesObj: [{ name: "C", octave: 4 }],
      },
      currentNotesBtn: {
        notesObj: [], // string array includes C ->  B
        octave: 0,
      },
      ansNotes: [],
      status: "answering", // < "" ,‘wrong’ || ‘correct’ || ‘answering’ > 分別代表還沒開始、答題錯誤、正確、答題中等
    };
  },
  watch: {
    "currentNotes.notesObj"() {
      this.triggerPolyNotes(this.currentNotes.notesObj);
    },
  },
  methods: {
    async startAudio() {
      await Tone.start();
      this.status = "answering";
    },
    triggerSingleNote(noteObj) {
      //create a synth and connect it to the main output (your speakers)
      const synth = new Tone.Synth().toDestination();
      const now = Tone.now();

      //play a middle 'C' for the duration of an 8th note
      synth.triggerAttack(noteObj.name + noteObj.octave, now);
      synth.triggerRelease(now + 1);
    },
    triggerPolyNotes(notesObj) {
      const synth = new Tone.PolySynth(Tone.Synth).toDestination();
      const now = Tone.now();

      notesObj.forEach((noteObj) => {
        synth.triggerAttack(noteObj.name + noteObj.octave, now);
      });

      synth.triggerRelease(
        notesObj.map((noteObj) => noteObj.name + noteObj.octave),
        now + 1,
      );
    },
    changeCurrentNotes() {
      this.currentNotes.notesObj = getRandomNotes(
        this.typeOfNotes,
        this.currentNotes.amount,
      );
      this.ansNotes = [];
      this.status = "answering";
    },
    initNotesBtn() {
      this.currentNotesBtn.notesObj = generateNotesByOctave(4);
      this.currentNotesBtn.octave = 4;
    },
    // updates notes Btn,
    updateNotesBtn() {
      return {
        up: () => {
          if (this.currentNotesBtn.octave === 8) return;
          this.currentNotesBtn.notesObj = generateNotesByOctave(
            this.currentNotesBtn.octave + 1,
          );
          this.currentNotesBtn.octave++;
        },
        down: () => {
          if (this.currentNotesBtn.octave === 0) return;
          this.currentNotesBtn.notesObj = generateNotesByOctave(
            this.currentNotesBtn.octave - 1,
          );
          this.currentNotesBtn.octave--;
        },
      };
    },
    // answer-relation function includes: answer, clear, submit
    answer(noteObj) {
      return {
        answer: () => {
          if (this.status === "correct") return;
          this.triggerSingleNote(noteObj);
          this.ansNotes.push(noteObj);
        },
        clear: () => {
          this.ansNotes = [];
          this.status = "answering";
        },
        submit: () => {
          if (this.ansNotes.length !== this.currentNotes.amount) {
            this.status = "wrong";
            return;
          }

          for (let i = 0; i < this.currentNotes.notesObj.length; i++) {
            if (
              this.ansNotes[i].name !== this.currentNotes.notesObj[i].name ||
              this.ansNotes[i].octave !== this.currentNotes.notesObj[i].octave
            ) {
              this.status = "wrong";
              return;
            }
          }

          this.status = "correct";
        },
      };
    },
  },
  computed: {
    ansNotesString() {
      return this.ansNotes
        .map((noteObj) => noteObj.name + noteObj.octave)
        .toString();
    },
  },
};
</script>
<style scoped lang="scss">
@import "../assets/customscss/variables";

.randomNotesGenerator {
  max-width: 33.75rem; // 540px
  &__question {
    width: fit-content;
  }
}
.notesBtnContainer {
  &__list {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    flex-wrap: wrap;
  }
}
.btn {
  &--notes {
    background: $primary;
    color: #ffffff;
    width: 3.2rem; // 51.2px
    height: 3.2rem;
    font-size: 1.2rem;
    border-radius: 50%;
    box-shadow: 0 1rem 3rem rgba(#000, 0.15);
    transition:
      background-color 0.3s,
      color 0.3s,
      transform 0.3s;

    &:hover {
      background-color: rgba($primary, 0.8);
      color: #ffffff;
      transform: translateY(-0.2rem);
    }

    &:active {
      transform: translateY(0.2rem);
      box-shadow: 0 1rem 4rem rgba(#000, 0.2);
      background-color: rgba($primary, 0.8) !important;
      color: #ffffff !important;
    }
  }

  // music play btn
  &--music {
    background-color: $primary;
    border: 1px solid $primary;
    transition: all 0.3s;
    &:hover {
      background-color: rgba($primary, 0.8);
      color: #ffffff;
    }

    &:active {
      border: 1px solid $primary;
      box-shadow: 0 1rem 4rem rgba(#000, 0.2);
      background-color: rgba($primary, 0.8) !important;
      color: #ffffff !important;
    }
  }
}
</style>
