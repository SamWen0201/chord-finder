<template>
  <div class="randomNotesGenerator container">
    <div class="row">
      <div class="col">
        <form @submit.prevent="answer().submit" v-if="status">
          <input v-model="ansNotesString" />
          <button type="button" @click="answer().clear">clear</button>
          <button type="submit">submit</button>
          <button type="button" @click="triggerNotes(ansNotes)">play</button>
          <span class="d-inline-block ml-5">{{ status }}</span>
        </form>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <button type="button" @click="startAudio" v-if="status === ''">
          Start Listening
        </button>
      </div>
      <div class="col">
        <div v-if="status">
          <button type="button" @click="triggerNotes(currentNotes.notesObj)">
            Play
          </button>
          <button type="button" @click="changeCurrentNotes">Next one</button>
        </div>
      </div>

      <!-- notesBtnContainer -->
      <div class="col">
        <div class="notesBtnContainer" v-if="status">
          <ul class="d-flex list-unstyled">
            <li v-for="noteObj in currentNotesBtn.notesObj">
              <button type="button" @click="answer(noteObj).answer">
                {{ noteObj.name }}{{ noteObj.octave }}
              </button>
            </li>
          </ul>
          <button type="button" @click="updateNotesBtn().up">Up</button>
          <button type="button" @click="updateNotesBtn().down">Down</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  WHOLE_PIANO_NOTES,
  getRandomNotes,
  generateNotesByOctaveRange,
  generateNotesByRange,
  generateNotesByOctave,
} from "./notes";
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
      status: "", // < "" ,‘wrong’ || ‘correct’ || ‘answering’ > 分別代表還沒開始、答題錯誤、正確、答題中等
    };
  },
  watch: {
    "currentNotes.notesObj"() {
      this.triggerNotes(this.currentNotes.notesObj);
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
    triggerNotes(notesObj) {
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
    answer(noteObj) {
      return {
        answer: () => {
          this.triggerSingleNote(noteObj);
          this.ansNotes.push(noteObj);
        },
        clear: () => {
          this.ansNotes = [];
        },
        submit: () => {
          let status = "wrong";
          if (this.ansNotes.length !== this.currentNotes.amount) {
            this.status = status;
            return;
          }

          this.ansNotes.forEach((noteObj, index) => {
            if (
              noteObj.name === this.currentNotes.notesObj[index].name &&
              noteObj.octave === this.currentNotes.notesObj[index].octave
            ) {
              status = "correct";
            } else {
              status = "wrong";
            }
          });
          this.status = status;
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
<style></style>
