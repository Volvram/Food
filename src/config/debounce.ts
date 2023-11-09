export const debounce = (func: (args: any) => void) => {
  let timer: NodeJS.Timeout;

  return function (...args: any) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, 1000);
  };
};
