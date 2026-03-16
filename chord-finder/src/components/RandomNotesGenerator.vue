<template>
  <div class="randomNotesGenerator container">
    <!-- WHOLE PIANO NOTES A0->C8 -->
    <!-- <div class="row mt-5">
      <div class="col">
        <ul>
          <li v-for="noteObj in notesObj">
            <div type="button" @click="triggerSingleNote(noteObj)">
              {{ noteObj.name }} {{ noteObj.octave }}
            </div>
          </li>
        </ul>
      </div>
    </div> -->

    <!--  -->
    <div class="row">
      <div class="col">
        <button type="button" @click="startAudio" v-if="status === ''">
          Start Listening
        </button>
      </div>
      <div class="col">
        <div v-if="status">
          <button type="button" @click="triggerNotes">Play</button>
          <button type="button" @click="changeCurrentNotes">Next one</button>
        </div>
      </div>
      <div class="col">
        <div class="notesBtnContainer" v-if="status">
          <ul>
            <li v-for="noteObj in currentNotesBtn.notesObj">
              <button type="button" @click="triggerSingleNote(noteObj)">
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
    this.inithNotesBtn();
    console.log("Initialize Notes button on the page");
  },
  data() {
    return {
      typeOfNotes: WHOLE_PIANO_NOTES, // < WHOLE_PIANO_NOTES || generateNotesByOctaveRange() ||  generateNotesByRange()
      currentNotes: {
        type: "", // < ’’ || ‘major’ || ‘minor’ || ‘sus2’ || … >”, 空字串代表目前沒有選擇和弦類型（因為是屬於隨機）
        amount: 1,
        notesObj: [
          { name: "C", octave: 4 },
          { name: "F", octave: 4 },
          { name: "G", octave: 4 },
        ],
      },
      currentNotesBtn: {
        notesObj: [], // string array includes C ->  B
        octave: 0,
      },
      ansNotes: [],
      status: "", // < "" ,‘wrong’ || ‘correct’ || ‘answering’ > 分別代表還沒開始、答題錯誤、正確、答題中等
    };
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
    triggerNotes() {
      const synth = new Tone.PolySynth(Tone.Synth).toDestination();
      const now = Tone.now();

      this.currentNotes.notesObj.forEach((noteObj) => {
        synth.triggerAttack(noteObj.name + noteObj.octave, now);
      });

      synth.triggerRelease(
        this.currentNotes.notesObj.map(
          (noteObj) => noteObj.name + noteObj.octave,
        ),
        now + 1,
      );
    },
    changeCurrentNotes() {
      this.currentNotes.notesObj = getRandomNotes(
        this.typeOfNotes,
        this.currentNotes.amount,
      );
    },
    inithNotesBtn() {
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
  },
};
</script>
<style></style>
