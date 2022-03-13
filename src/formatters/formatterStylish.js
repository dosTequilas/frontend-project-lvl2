import _ from 'lodash';

const getTabSize = (currentDepth, multiplier = 4) => {
  const space = ' ';
  const result = space.repeat(currentDepth * multiplier - 2);
  return result;
};

const getFormattedValue = (value, depth) => {
  if (!_.isObject(value)) {
    return String(value);
  }
  const tab = getTabSize(depth, 4);
  const tabClose = getTabSize(depth - 1, 4);

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
      switch (key.type) {
        case 'nested': {
          const formattedChildren = iter(key.children, depth + 1);
          const tabNes = getTabSize(depth);
          const nes = `${tabNes}  ${key.name}: {\n${formattedChildren}\n${tabNes}  }`;
          return nes;
        }
        case 'unchanged': {
          const tabUnc = getTabSize(depth);
          const unc = `${tabUnc}  ${key.name}: ${getFormattedValue(key.value, depth + 1)}`;
          return unc;
        }
        case 'deleted': {
          const tabDel = getTabSize(depth);
          const del = `${tabDel}- ${key.name}: ${getFormattedValue(key.value, depth + 1)}`;
          return del;
        }
        case 'added': {
          const tabAdd = getTabSize(depth);
          const add = `${tabAdd}+ ${key.name}: ${getFormattedValue(key.value, depth + 1)}`;
          return add;
        }
        case 'changed': {
          const tabCha = getTabSize(depth);
          const formatted1 = `${tabCha}- ${key.name}: ${getFormattedValue(key.oldValue, depth + 1)}\n`;
          const formatted2 = `${tabCha}+ ${key.name}: ${getFormattedValue(key.newValue, depth + 1)}`;
          return formatted1 + formatted2;
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
