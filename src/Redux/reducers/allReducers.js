import { combineReducers } from "redux";
import mainReducer from "./mainReducer";

const allReducers = combineReducers({
  tasks: mainReducer,
});

export default allReducers;
