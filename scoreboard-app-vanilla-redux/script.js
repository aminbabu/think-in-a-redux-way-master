// select DOM elements
const matchWrapper = document.getElementsByClassName("all-matches")[0];
const addMatchBtn = document.getElementsByClassName("lws-addMatch")[0];
const ResetMatchBtn = document.getElementsByClassName("lws-reset")[0];

// actions identifiers
const actionIdentifiers = {
  INCREMENT: "increment",
  DECREMENT: "decrement",
  UPDATE_STATES: "update_states",
  RESET_STATES: "reset_states",
  REMOVE_MATCH: "remove_match",
};

// action creators
const counterActionCreators = {
  increment: (id, value) => {
    return { type: actionIdentifiers.INCREMENT, payload: { id, value } };
  },
  decrement: (id, value) => {
    return { type: actionIdentifiers.DECREMENT, payload: { id, value } };
  },
  updateStates: (id, value) => {
    return { type: actionIdentifiers.UPDATE_STATES, payload: { id, value } };
  },
  resetStates: (value) => {
    return { type: actionIdentifiers.RESET_STATES, payload: { value } };
  },
  removeMatch: (id) => {
    return { type: actionIdentifiers.REMOVE_MATCH, payload: { id } };
  },
};

// initail states
const initialStates = [
  {
    id: 0,
    value: 0,
  },
];

// counter reducer
const counterReducer = (states = initialStates, { type, payload }) => {
  switch (type) {
    case actionIdentifiers.INCREMENT:
      return states.map((state) =>
        state.id === payload.id
          ? { ...state, value: state.value + payload.value }
          : { ...state }
      );

    case actionIdentifiers.DECREMENT:
      return states.map((state) =>
        state.id === payload.id
          ? {
              ...state,
              value:
                state.value > payload.value ? state.value - payload.value : 0,
            }
          : { ...state }
      );

    case actionIdentifiers.UPDATE_STATES:
      const prevStates = states.map((state) => {
        return { ...state };
      });
      return [
        ...prevStates,
        {
          id: payload.id,
          value: payload.value,
        },
      ];

    case actionIdentifiers.RESET_STATES:
      return states.map((state) => {
        return { ...state, value: 0 };
      });

    case actionIdentifiers.REMOVE_MATCH:
      return states.filter((state) => state.id !== payload.id);

    default:
      return states;
  }
};

// create redux store
const store = Redux.createStore(counterReducer);

// create a new match
const getMatch = (id, value) => {
  return `<div id="match${id}" class="match">
  <div class="wrapper">
    <button class="lws-delete">
      <img src="./image/delete.svg" alt="" />
    </button>
    <h3 class="lws-matchName">Match ${id + 1}</h3>
  </div>
  <div class="inc-dec">
    <form class="incrementForm">
      <h4>Increment</h4>
      <input type="number" name="increment" class="lws-increment" />
    </form>
    <form class="decrementForm">
      <h4>Decrement</h4>
      <input type="number" name="decrement" class="lws-decrement" />
    </form>
  </div>
  <div class="numbers">
    <h2 class="lws-singleResult">${value}</h2>
  </div>
</div>`;
};

// remove a match from the DOM
const removeMatch = (id) => {
  const deleteBtn = document
    .getElementById(`match${id}`)
    .querySelector(".lws-delete");

  if (!deleteBtn) return;

  deleteBtn.addEventListener("click", () => {
    store.dispatch(counterActionCreators.removeMatch(id));
  });
};

// input events
const inputEvents = (id) => {
  const match = document.getElementById(`match${id}`);
  const forms = Array.from(match.querySelectorAll("form"));

  if (!forms.length) return;

  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const incrementInput = match.querySelector(".lws-increment");
      const decrementInput = match.querySelector(".lws-decrement");
      let incrementedValue = Number(incrementInput.value);
      let decrementedValue = Number(decrementInput.value);

      store.dispatch(counterActionCreators.increment(id, incrementedValue));
      store.dispatch(counterActionCreators.decrement(id, decrementedValue));
    });
  });
};

// populate UI
const populateUI = () => {
  const states = store.getState();
  let allMatch = "";

  states.forEach((state) => {
    allMatch += getMatch(state.id, state.value);
  });

  matchWrapper.innerHTML = allMatch;
};

// render ui based on states
const render = () => {
  const states = store.getState();

  // render match elements to the DOM
  populateUI();

  states.forEach((state) => {
    removeMatch(state.id);
    inputEvents(state.id);
  });
};

// initial rendering
render();

// subscribe to the store
store.subscribe(render);

// add new match
addMatchBtn.addEventListener("click", () => {
  const states = store.getState();
  const id = states[states.length - 1] ? states[states.length - 1].id + 1 : 0;
  store.dispatch(counterActionCreators.updateStates(id, 0));
});

// reset match counter
ResetMatchBtn.addEventListener("click", () => {
  store.dispatch(counterActionCreators.resetStates(0));
});
