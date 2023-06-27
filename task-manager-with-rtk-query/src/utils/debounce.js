const debounce = (fn, delay) => {
  let interval;

  return (...args) => {
    clearTimeout(interval);

    interval = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

export default debounce;
