import { readFileSync } from 'fs';
import path from 'path';
import diff from '../src/genDiff.js';

const getFixturePath = (filename) => path.resolve('__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const correctPlain = readFile('correctPlain.txt');
const correctStylish = readFile('correctStylish.txt');
const correctJson = readFile('correctJson.txt');

test.each(['yml', 'json'])('diff', (extention) => {
  const path1 = getFixturePath(`file1.${extention}`);
  const path2 = getFixturePath(`file2.${extention}`);
  const testPlain = diff(path1, path2, 'plain');
  expect(testPlain).toBe(correctPlain);
  const testStylish = diff(path1, path2, 'stylish');
  expect(testStylish).toBe(correctStylish);
  const testJson = diff(path1, path2, 'json');
  expect(testJson).toBe(correctJson);
});
