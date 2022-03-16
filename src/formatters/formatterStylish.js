import _ from 'lodash';

const getTab = (currentDepth, multiplier = 4) => {
  const space = ' ';
  const result = space.repeat(currentDepth * multiplier - 2);
  return result;
};

const getFormattedValue = (value, depth) => {
  if (!_.isObject(value)) {
    return String(value);
  }
  const tab = getTab(depth, 4);
  const tabClose = getTab(depth - 1, 4);

  const entries = Object.entries(value);

  const result = entries.map(([key, innerValue]) => {
    const tempString = `${tab}  ${key}: ${getFormattedValue(innerValue, depth + 1)}`;
    return tempString;
  });
  return ['{', ...result, `${tabClose}  }`].join('\n');
};

const formatter = (tree) => {
  const iter = (node, depth) => {
    const arrMap = node.map((key) => {
      const tab = getTab(depth);
      switch (key.type) {
        case 'nested': {
          const formattedChildren = iter(key.children, depth + 1);
          return `${tab}  ${key.name}: {\n${formattedChildren}\n${tab}  }`;
        }
        case 'unchanged': {
          return `${tab}  ${key.name}: ${getFormattedValue(key.value, depth + 1)}`;
        }
        case 'deleted': {
          return `${tab}- ${key.name}: ${getFormattedValue(key.value, depth + 1)}`;
        }
        case 'added': {
          return `${tab}+ ${key.name}: ${getFormattedValue(key.value, depth + 1)}`;
        }
        case 'changed': {
          const formattedOldValue = `${tab}- ${key.name}: ${getFormattedValue(key.oldValue, depth + 1)}\n`;
          const formattedNewValue = `${tab}+ ${key.name}: ${getFormattedValue(key.newValue, depth + 1)}`;
          return formattedOldValue + formattedNewValue;
        }
        default: {
          return null;
        }
      }
    });
    return arrMap.join('\n');
  };
  const result = `{\n${iter(tree, 1)}\n}`;
  return result;
};

export default formatter;
