import {StringReader, StringArray} from '../reader/reader'

const reader = new StringReader("../inputs/input2.txt");
const strings: StringArray = reader.read();

console.log(computeResult(strings));

function computeResult(strings: StringArray): string {

  for(let word1 of strings.strings) {
    for (let word2 of strings.strings) {

      if (word1 == word2) { 
        continue;
      }

      if (checkIfAlmostEqual(word1, word2)) {
        return word1 + " " + word2;
      }
    }
  }
  return "";
}

function checkIfAlmostEqual(word1: string, word2: string): boolean {
  let diffs = 0;
  for (let i = 0; i < word1.length; ++i) {
    if (word1[i] != word2[i]) {
      ++diffs;
      if (diffs > 1) {
        return false;
      }
    }
  }
  if (diffs == 1) {
    return true;
  }
  return false;
}





