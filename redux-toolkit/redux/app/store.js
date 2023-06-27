const { legacy_createStore: createStore, applyMiddleware } = require("redux");
const { default: thunk } = require("redux-thunk");
const rootReducer = require("./rootReducer");

const store = createStore(rootReducer, applyMiddleware(thunk));

module.exports = store;
