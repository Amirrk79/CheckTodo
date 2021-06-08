import { TOGGLE_COMPLETED } from "./actions";

function toggleCompleted(id) {
  return {
    type: TOGGLE_COMPLETED,
    payload: id,
  };
}

export default toggleCompleted;
