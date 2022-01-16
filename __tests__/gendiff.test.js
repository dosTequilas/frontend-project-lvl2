import diff from '../src/genDiff';
import path from 'path';
import { readFileSync } from 'fs';

// JSON.parse - собирает объект из файла
// readFileSync (из библиотеки fs) - чтение файла
// path.resolve - собирает путь из отрезков
// const correct = JSON.parse(readFileSync(path.resolve(__dirname, correctResult.json)));

const getFixturePath = (filename) => path.resolve('__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

// const file1 = JSON.parse(readFile('file1.json'));
// const file2 = JSON.parse(readFile('file2.json'));
const correct = readFile('correctResult.txt');

test('diff', () => {
  expect(diff('./__fixtures__/file1.json', './__fixtures__/file2.json')).toBe(correct);
});
