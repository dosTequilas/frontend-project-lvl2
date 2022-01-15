import _ from 'lodash';
import { readFileSync } from 'fs';
import path from 'path';

const diff = (file1, file2) => {
  const path1 = path.resolve(process.cwd(), file1);
  const path2 = path.resolve(process.cwd(), file2);

  const obj1 = JSON.parse(readFileSync(path1));
  const obj2 = JSON.parse(readFileSync(path2));
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const commonKeys = _.sortBy(_.union(keys1, keys2));

  let result = commonKeys.map((key) => {
    if (obj1[key] === obj2[key]) {
      return `${key}: ${obj1[key]}`;
    } else if (!obj2[key]) {
      return `- ${key}: ${obj1[key]}`;
    } else if (!obj1[key]) {
      return `+ ${key}: ${obj2[key]}`;
    } else if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key) && obj1[key] !== obj2[key]) {
      return `- ${key}: ${obj1[key]}` + `\n` + `+ ${key}: ${obj2[key]}`;
    } else {
      return null;
    }
  });

  return result.join('\n');
};

export default diff;
