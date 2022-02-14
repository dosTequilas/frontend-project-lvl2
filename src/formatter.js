const formatter = (tree) => {
  const iter = (node, depth) => {
    const arrMap = node.flatMap((key) => {
      if (key.type === 'nested') {
        const formattedChildren = iter(key.children, depth + 1);
        const tab = ''; //функцию для вычисления отступа
        const result = `${tab}  ${key.name}: {\n${formattedChildren}\n${tab}}`;
        return result; // не массив, а строку, добавить отступы
      }
      if (key.type === 'unchanged') {
        const tab = '';
        const result = `${tab}  ${key.name}: ${key.value}`;
        return result;
      }
      if (key.type === 'deleted') {
        const tab = '';
        const result = `${tab}- ${key.name}: ${key.value}`;
        return result;
      }
      if (key.type === 'added') {
        const tab = '';
        const result = `${tab}+ ${key.name}: ${key.value}`;
        return result;
      }
      if (key.type === 'changed') {
        const tab = '';
        const result = `${tab}- ${key.name}: ${key.oldValue}\n${tab}+ ${key.name}: ${key.newValue}`;
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
