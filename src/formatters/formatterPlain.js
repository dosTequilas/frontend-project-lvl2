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
  const iter = (children, parent) => {
    const diffColl = children.flatMap((node) => {
      const newPath = parent ? `${parent}.${node.name}` : `${node.name}`;
      switch (node.type) {
        case 'nested':
          return iter(node.children, newPath);
        case 'unchanged':
          return [];
        case 'deleted':
          return `Property '${newPath}' was removed`;
        case 'added':
          return `Property '${newPath}' was added with value: ${formatValue(node.value)}`;
        case 'changed':
          return `Property '${newPath}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`;
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
