import { readFileSync } from 'fs';
import path from 'path';
import parse from './parsers/index.js';
import treeBuilder from './treeBuilder.js';
import formatter from './formatters/index.js';

const diff = (file1, file2, formatName = 'stylish') => {
  const path1 = path.resolve(process.cwd(), file1);
  const path2 = path.resolve(process.cwd(), file2);

  const format1 = path.extname(path1);
  const format2 = path.extname(path2);

  const data1 = readFileSync(path1);
  const data2 = readFileSync(path2);

  const obj1 = parse(data1, format1);
  const obj2 = parse(data2, format2);

  const tree = treeBuilder(obj1, obj2);

  const result = formatter(tree, formatName);
  return result;
};

export default diff;
