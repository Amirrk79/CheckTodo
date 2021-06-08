import * as Actions from "../actions/actions";

const intialState = JSON.parse(localStorage.getItem("data")) || [];

const mainReducer = (state = intialState, action) => {
  switch (action.type) {
    case Actions.ADD_TASK: {
      let newState = [...state, action.payload];
      localStorage.setItem("data", JSON.stringify(newState));
      return newState;
    }
    case Actions.REMOVE_TASK: {
      let newState = [...state];
      newState = newState.filter((task) => task.id != action.payload);
      localStorage.setItem("data", JSON.stringify(newState));
      return newState;
    }
    case Actions.UPDATE_TASK: {
      let newState = [...state];
      let index;
      index = newState.findIndex((task) => task.id === action.payload.id);
      newState[index] = action.payload;
      localStorage.setItem("data", JSON.stringify(newState));
      return newState;
    }
    case Actions.TOGGLE_COMPLETED: {
      let newState = [...state];
      let index;
      index = newState.findIndex((task) => task.id === action.payload);
      newState[index].isCompleted = !newState[index].isCompleted;
      localStorage.setItem("data", JSON.stringify(newState));
      return newState;
    }
    default: {
      return state;
    }
  }
};

export default mainReducer;
