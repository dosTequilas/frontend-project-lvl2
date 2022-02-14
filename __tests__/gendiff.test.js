import { readFileSync } from 'fs';
import path from 'path';
import diff from '../src/genDiff.js';

// JSON.parse - собирает объект из файла
// readFileSync (из библиотеки fs) - чтение файла
// path.resolve - собирает путь из отрезков

const getFixturePath = (filename) => path.resolve('__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const correct = readFile('correctResult.txt');

test('diff', () => {
  expect(diff('./__fixtures__/file1.json', './__fixtures__/file2.json')).toBe(correct);
  expect(diff('./__fixtures__/file1.yml', './__fixtures__/file2.yml')).toBe(correct);
});
