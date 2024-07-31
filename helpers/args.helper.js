
const getArgs = (args) => {
  const res = {};
  const [executer, file, ...rest] = args;

  if (!rest) {
    res.h = true;
    return res;
  }

  rest.forEach((value, index, arr) => {
    if(value.charAt(0) === '-') {
      const nextElement = arr[index + 1];
      if (index === arr.length - 1) {
        // Флаги без значений
        res[value.substring(1)] = true;
      } else if (nextElement.charAt(0) !== '-') {
        // Флаги со значениями
        res[value.substring(1)] = arr[index + 1];
      } else {
        // Флаг без значений
        res[value.substring(1)] = true;
      }
    }
  });
  
  return res;
}

export { getArgs };
