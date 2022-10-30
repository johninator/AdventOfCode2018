import {StringReader, StringArray} from '../reader/reader'

const reader = new StringReader("../inputs/input2.txt");
const strings: StringArray = reader.read();

function computeResult(strings: StringArray): number {

    let wordCounts = new Map();

    for (const word of strings.strings) {
      let charCounts = new Map();

      for (const char of word) {

        if (!charCounts.has(char)) {
            charCounts.set(char, 1);
            continue;
        }

        charCounts.set(char, charCounts.get(char) + 1);
      }

      let countSet = new Set();
      charCounts.forEach((val) => countSet.add(val));
      
      for (const count of countSet) {
        if (!wordCounts.has(count)) {
            wordCounts.set(count, 1);
            continue;
        }
        wordCounts.set(count, wordCounts.get(count) + 1);
      }
    }
    console.log(wordCounts);

    return wordCounts.get(3) * wordCounts.get(2);
}
console.log(computeResult(strings));




