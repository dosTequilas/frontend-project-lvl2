const valueChecker = (val) => {
  if (typeof val === 'boolean') {
    return val;
  }
  if (typeof val !== 'object') {
    return `'${val}'`;
  }
  if (val === null) {
    return null;
  }
  return '[complex value]';
};

const plainFormatter = (tree) => {
  const iter = (node, parent) => {
    const diffColl = node.flatMap(({ name, type, children, value, oldValue, newValue }) => {
      const newPath = parent ? `${parent}.${name}` : `${name}`;
      if (type === 'nested') {
        return iter(children, newPath);
      }
      if (type === 'unchanged') {
        const result = [];
        return result;
      }
      if (type === 'deleted') {
        const result = `Property '${newPath}' was removed`;
        return result;
      }
      if (type === 'added') {
        const result = `Property '${newPath}' was added with value: ${valueChecker(value)}`;
        return result;
      }
      if (type === 'changed') {
        const result = `Property '${newPath}' was updated. From ${valueChecker(
          oldValue
        )} to ${valueChecker(newValue)}`;
        return result;
      }
      return name;
    });
    return diffColl.join('\n');
  };
  const result = iter(tree, '');
  return result;
  console.log(result);
};

export default plainFormatter;
