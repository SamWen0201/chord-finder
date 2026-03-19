export const WHOLE_PIANO_NOTES = generateAllNotesArr();

// generative whole piano notes
function generateAllNotesArr() {
  let notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  let notesObjArr = [
    { name: "A", octave: 0 },
    { name: "A#", octave: 0 },
    { name: "B", octave: 0 },
  ];

  const MAX_OCTAVE = 8; // C8 is the highest note
  let countOctave = 1;

  while (countOctave < MAX_OCTAVE) {
    for (let i = 0; i < notes.length; i++) {
      notesObjArr.push({ name: notes[i], octave: countOctave });
    }
    countOctave++;
  }

  notesObjArr.push({ name: "C", octave: 8 }); // finished
  return notesObjArr;
}

// generate notes based on noteStart and noteEnd and return notes in defined range
export function generateNotesByRange(noteStart, noteEnd) {
  // make sure the noteStart and noteEnd is (note string format) which means they should be  'A3', 'C3', 'B5' string format

  if (typeof noteStart !== "string" || typeof noteEnd !== "string")
    throw new Error(
      "parameters should be 'A4', 'C4', 'A0' note string format ",
    );

  let range = { start: {}, end: {} };
  let notesObj = [];

  // find noteStart order and noteEnd order
  for (let i = 0; i < WHOLE_PIANO_NOTES.length; i++) {
    if (noteStart === WHOLE_PIANO_NOTES[i].name + WHOLE_PIANO_NOTES[i].octave) {
      range.start = {
        name: WHOLE_PIANO_NOTES[i].name,
        octave: WHOLE_PIANO_NOTES[i].octave,
        order: i,
      };
    }
    if (noteEnd === WHOLE_PIANO_NOTES[i].name + WHOLE_PIANO_NOTES[i].octave) {
      range.end = {
        name: WHOLE_PIANO_NOTES[i].name,
        octave: WHOLE_PIANO_NOTES[i].octave,
        order: i,
      };
    }
  }

  // add noteObj between the range
  for (let i = range.start.order; i <= range.end.order; i++) {
    notesObj.push(WHOLE_PIANO_NOTES[i]);
  }
  return notesObj;
}
// edge case 0~0 8~8
// generate  notes based on noteStart and noteEnd
export function generateNotesByOctaveRange(minOctave, maxOctave) {
  // type check and value check
  if (typeof minOctave !== "number" || typeof maxOctave !== "number") {
    throw new Error(
      "minOctave or maxOctave is not a number, make sure the parameters to be an integer",
    );
  }
  if (minOctave < 0 || minOctave > 7 || maxOctave < 0 || maxOctave > 8)
    throw new Error("minOctave and maxOctave should in range 0 <= X <= 8");

  if (maxOctave - minOctave <= 0)
    throw new Error("minOctave should smaller than maxOctave");

  // start
  let notesObj = [];

  if (minOctave === 0) {
    if (maxOctave === 8) {
      return WHOLE_PIANO_NOTES; // return whole
    } else {
      let count = 3 + 12 * (maxOctave - minOctave); // 3 stands for 'A0' 'A#0' 'B0'
      for (let i = 0; i < count; i++) {
        notesObj.push(WHOLE_PIANO_NOTES[i]);
      }
    }
  } else {
    if (maxOctave === 8) {
      let start = 3 + 12 * (minOctave - 1); // 3 stands for 'A0' 'A#0' 'B0'

      for (let i = start; i < WHOLE_PIANO_NOTES.length; i++) {
        notesObj.push(WHOLE_PIANO_NOTES[i]);
      }
    } else {
      let count = 12 * (maxOctave - minOctave + 1);
      let start = 3 + 12 * (minOctave - 1);

      for (let i = start; i < start + count; i++) {
        notesObj.push(WHOLE_PIANO_NOTES[i]);
      }
    }
  }

  return notesObj;
}

// console.log(generateNotesByOctaveRange([]));
// console.log(generateNotesByOctaveRange(3, 5)); // -> C3->B5 36 notes 12 * (5-3+1)
// console.log(generateNotesByOctaveRange(3, 5).length); // -> C3->B5 36 notes 12 * (5-3+1)
// console.log(generateNotesByOctaveRange(0, 2)); // -> 3 + 24 = 27 notes 3 + 12 * (2-0)
// console.log(generateNotesByOctaveRange(0, 2).length); // -> 3 + 24 = 27 notes 3 + 12 * (2-0)
// console.log(generateNotesByOctaveRange(6, 8)); // -> 24 + 1 = 25 notes 1 + 12 * (8-6)
// console.log(generateNotesByOctaveRange(6, 8).length); // -> 24 + 1 = 25 notes 1 + 12 * (8-6)

// generate notes in a certain octave
export function generateNotesByOctave(octave) {
  let notesObj = WHOLE_PIANO_NOTES.filter(
    (noteObj) => noteObj.octave === octave,
  );

  return notesObj;
}
// console.log(generateNotesByOctave(0));
// console.log(generateNotesByOctave(3));
// console.log(generateNotesByOctave(7));
// console.log(generateNotesByOctave(8));

// get random noteObj based on notesObj and amount(determine the notes amount)
export function getRandomNotes(notesObj, amount) {
  if (Array.isArray(notesObj) !== true || typeof amount !== "number")
    // console.log(notesObj, amount);
    throw new Error("Parameters are wrong");
  // assume the parameters' format are correct

  let randomNotesObj = []; // store the random notes

  while (randomNotesObj.length < amount) {
    let randomInt = getRandomInt(0, notesObj.length); // get a random note from param notesObj

    // check whether the same notes in the randomNotesObj or not.
    for (let i = 0; i < randomNotesObj.length; i++) {
      if (
        randomNotesObj[i].name + randomNotesObj[i].octave ===
        notesObj[randomInt].name + notesObj[randomInt].octave
      )
        randomNotesObj.pop();
    }
    randomNotesObj.push(notesObj[randomInt]);
  }

  return randomNotesObj;
}
// console.log(getRandomNotes(WHOLE_PIANO_NOTES, 3));
// console.log(getRandomNotes(generateNotesByOctaveRange(3, 5), 7));
// console.log(getRandomNotes(generateNotesByRange("A4", "C8"), 9));
// console.log(getRandomNotes(generateNotesByRange("A0", "C5"), 9));

// give a random integer between min and max. (both min and max are included)
function getRandomInt(min, max) {
  const minCieled = Math.ceil(min);
  const maxFloor = Math.floor(max);

  return Math.floor(Math.random() * (maxFloor - minCieled) + minCieled);
}
