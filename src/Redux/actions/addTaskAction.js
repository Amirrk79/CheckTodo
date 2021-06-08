import { ADD_TASK } from "./actions";

function addtask(task) {
  return {
    type: ADD_TASK,
    payload: task,
  };
}

export default addtask;
