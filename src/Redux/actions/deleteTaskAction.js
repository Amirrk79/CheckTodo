import { REMOVE_TASK } from "./actions";

function deleteTask(id) {
  return {
    type: REMOVE_TASK,
    payload: id,
  };
}

export default deleteTask;
