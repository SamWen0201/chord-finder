import * as Tone from "tone";
export function triggerSingleNote(noteObj) {
  //create a synth and connect it to the main output (your speakers)
  const synth = new Tone.Synth().toDestination();
  const now = Tone.now();

  //play a middle 'C' for the duration of an 8th note
  synth.triggerAttack(noteObj.name + noteObj.octave, now);
  synth.triggerRelease(now + 1);
}
export function triggerPolyNotes(notesObj) {
  const synth = new Tone.PolySynth(Tone.Synth).toDestination();
  const now = Tone.now();

  notesObj.forEach((noteObj) => {
    synth.triggerAttack(noteObj.name + noteObj.octave, now);
  });

  synth.triggerRelease(
    notesObj.map((noteObj) => noteObj.name + noteObj.octave),
    now + 1,
  );
}
