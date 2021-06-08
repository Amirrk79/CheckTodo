import { UPDATE_TASK } from "./actions";

function updateTask(data) {
  return {
    type: UPDATE_TASK,
    payload: data,
  };
}

export default updateTask;
