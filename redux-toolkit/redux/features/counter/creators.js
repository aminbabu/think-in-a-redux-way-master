const { INCREMENT, DECREMENT } = require("./identifiers");

const incrementCounter = (value) => {
  return {
    type: INCREMENT,
    payload: { value },
  };
};

const decrementCounter = (value) => {
  return {
    type: DECREMENT,
    payload: { value },
  };
};

module.exports = { incrementCounter, decrementCounter };
