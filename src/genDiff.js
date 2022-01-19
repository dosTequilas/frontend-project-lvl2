import _ from 'lodash';
import { readFileSync } from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const diff = (file1, file2) => {
  const path1 = path.resolve(process.cwd(), file1);
  const path2 = path.resolve(process.cwd(), file2);

  const format1 = path.extname(path1);
  const format2 = path.extname(path2);

  let parse;

  if (format1 === '') {
    parse = JSON.parse;
  } else if (format1 === '.yml' || '.yaml') {
    parse = yaml.load;
  }

  const obj1 = parse(readFileSync(path1));
  const obj2 = parse(readFileSync(path2));

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  const commonKeys = _.sortBy(_.union(keys1, keys2));

  const result = commonKeys.map((key) => {
    if (obj1[key] === obj2[key]) {
      return `    ${key}: ${obj1[key]}`;
    }
    if (!obj2[key]) {
      return `  - ${key}: ${obj1[key]}`;
    }
    if (!obj1[key]) {
      return `  + ${key}: ${obj2[key]}`;
    }
    if (
      Object.prototype.hasOwnProperty.call(obj1, key) &&
      Object.prototype.hasOwnProperty.call(obj2, key) &&
      obj1[key] !== obj2[key]
    ) {
      return `  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}`;
    }
    return null;
  });

  return ['{', ...result, '}'].join('\n');
};

export default diff;
