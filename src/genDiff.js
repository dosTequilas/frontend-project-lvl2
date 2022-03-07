import _ from 'lodash';
import { readFileSync } from 'fs';
import path from 'path';
import parse from '../parsers/index.js';
import treeBuilder from './treeBuilder.js';
import formatter from './formatters/index.js';

/*

Parse - достает информацию по указанному пути

Treebuilder отдельная функция, которая строит дерево (Hexlet - виртуальная файловая система)
и находит разницу. вынести в отлдельный модуль

Formatter - форматирует строку, исходя из типов, попробовать switch
если нестед - вызвать эту-же функцию.

Diff - вызывает parse, treebuilder, formatter,
возвращает результат и экспортируется в исполняемый файл и в тест

*/

// const formatter = (unformattedString) => {

// };

const diff = (file1, file2, formatName = 'stylish') => {
  // собираем путь из текущей директории + пути до файла
  const path1 = path.resolve(process.cwd(), file1);
  const path2 = path.resolve(process.cwd(), file2);

  // определяем формат
  const format1 = path.extname(path1);
  const format2 = path.extname(path2);

  // получаем содерждимое пути
  const data1 = readFileSync(path1);
  const data2 = readFileSync(path2);

  // разбираем строку JSON
  const obj1 = parse(data1, format1);
  const obj2 = parse(data2, format2);

  // строим древовидную структуру
  const tree = treeBuilder(obj1, obj2);
  // применяем форматтер
  const result = formatter(tree, formatName);

  // return JSON.stringify(tree, null, 2);
  return result;
};

export default diff;
