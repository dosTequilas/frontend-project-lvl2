import stylish from './formatterStylish.js';
import plain from './formatterPlain.js';
import json from './formatterJson.js';

const formatter = (tree, formatType) => {
  if (formatType === 'stylish') {
    return stylish(tree);
  }
  if (formatType === 'plain') {
    return plain(tree);
  }
  if (formatType === 'json') {
    return json(tree);
  }
  return null;
};
export default formatter;
