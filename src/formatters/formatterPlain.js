const formatValue = (val) => {
  if (typeof val === 'string') {
    return `'${val}'`;
  }
  if (val === null) {
    return null;
  }
  if (typeof val === 'object') {
    return '[complex value]';
  }
  return val;
};

const plainFormatter = (tree) => {
  const iter = (node, parent) => {
    const diffColl = node.flatMap(({
      name, type, children, value, oldValue, newValue,
    }) => {
      const newPath = parent ? `${parent}.${name}` : `${name}`;
      switch (type) {
        case 'nested':
          return iter(children, newPath);
        case 'unchanged':
          return [];
        case 'deleted':
          return `Property '${newPath}' was removed`;
        case 'added':
          return `Property '${newPath}' was added with value: ${formatValue(value)}`;
        case 'changed':
          return `Property '${newPath}' was updated. From ${formatValue(oldValue)} to ${formatValue(newValue)}`;
        default:
          return null;
      }
    });
    return diffColl.join('\n');
  };
  const result = iter(tree, '');
  return result;
};

export default plainFormatter;
