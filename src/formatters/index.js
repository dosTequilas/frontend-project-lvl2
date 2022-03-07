import stylish from './formatter.js';
import plain from './formatterPlain.js';

const formatter = (tree, formatType) => {
  if (formatType === 'stylish') {
    return stylish(tree);
  }
  if (formatType === 'plain') {
    return plain(tree);
  }
  return null;
};
export default formatter;
