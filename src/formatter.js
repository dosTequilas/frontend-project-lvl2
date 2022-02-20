// import { keys } from 'lodash';

import _ from 'lodash';

const getTabSize = (currentDepth, multiplier = 2) => {
  const space = ' ';
  const result = space.repeat(currentDepth * multiplier);
  return result;
};

const getFormattedValue = (value, depth) => {
  const tab = getTabSize(depth, 4);
  const tabClose = getTabSize(depth - 1, 4);

  if (!_.isObject(value)) {
    return String(value);
  }
  const entries = Object.entries(value);

  const result = entries.map(([key, innerValue]) => {
    const tempString = `${tab}  ${key}: ${getFormattedValue(innerValue, depth + 1)}`;
    return tempString;
  });
  return ['{', ...result, `${tabClose}  }`].join('\n');
};

const formatter = (tree) => {
  const iter = (node, depth) => {
    const arrMap = node.flatMap((key) => {
      if (key.type === 'nested') {
        const formattedChildren = iter(key.children, depth + 1);
        const tab = getTabSize(depth);
        const result = `${tab}  ${key.name}: {\n${formattedChildren}\n${tab}}`;
        return result;
      }
      if (key.type === 'unchanged') {
        const tab = getTabSize(depth);
        const result = `${tab}  ${key.name}: ${getFormattedValue(key.value, depth)}`;
        return result;
      }
      if (key.type === 'deleted') {
        const tab = getTabSize(depth);
        const result = `${tab}- ${key.name}: ${getFormattedValue(key.value, depth)}`;
        return result;
      }
      if (key.type === 'added') {
        const tab = getTabSize(depth);
        const result = `${tab}+ ${key.name}: ${getFormattedValue(key.value, depth)}`;
        return result;
      }
      if (key.type === 'changed') {
        const tab = getTabSize(depth);
        const result = `${tab}- ${key.name}: ${getFormattedValue(key.oldValue, depth)}\n${tab}+ ${
          key.name
        }: ${getFormattedValue(key.newValue, depth)}`;
        return result;
      }
      return key.name;
    });
    return arrMap.join('\n');
  };
  const result = iter(tree, 1);
  console.log(`{\n${result}\n}`);
};

export default formatter;

// depth - глубина - количество отступов - вычисление таба
// обработка других условий
// setting5 - stringify - снаружи форматтера (formatvalue) - свои отступы, формировать
// в bin - параметр по умолчанию, функция будет принимать его, если пользователь не поменияет
