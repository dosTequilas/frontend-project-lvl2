import { readFileSync } from 'fs';
import path from 'path';
import diff from '../src/genDiff.js';

// JSON.parse - собирает объект из файла
// readFileSync (из библиотеки fs) - чтение файла
// path.resolve - собирает путь из отрезков

const getFixturePath = (filename) => path.resolve('__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const correct = readFile('correctPlain.txt');

test.each(['yml', 'json'])('diff', (extention) => {
  const path1 = `./__fixtures__/file1.${extention}`;
  const path2 = `./__fixtures__/file2.${extention}`;
  const result = diff(path1, path2, 'plain');
  expect(result).toBe(correct);
});
// для каждого формата вызывать тест (test each)
