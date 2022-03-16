import _ from 'lodash';

const treeBuilder = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const commonKeys = _.sortBy(_.union(keys1, keys2));

  const result = commonKeys.map((key) => {
    if (!_.has(obj1, key)) {
      return { name: key, type: 'added', value: obj2[key] };
    }
    if (!_.has(obj2, key)) {
      return { name: key, type: 'deleted', value: obj1[key] };
    }
    if (obj1[key] === obj2[key]) {
      return { name: key, type: 'unchanged', value: obj1[key] };
    }
    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      return {
        name: key,
        type: 'nested',
        children: treeBuilder(obj1[key], obj2[key]),
      };
    }
    if (!_.isEqual(obj1[key], obj2[key])) {
      return {
        name: key,
        type: 'changed',
        oldValue: obj1[key],
        newValue: obj2[key],
      };
    }
    return null;
  });
  return result;
};

export default treeBuilder;
