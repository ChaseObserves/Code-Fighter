import { combineReducers } from "redux";
import authReducer from "./authReducer";
import fightersReducer from "./fightersReducer";

export default combineReducers({
  auth: authReducer,
  fighters: fightersReducer
});

// Whatever keys we provide to this object-the one being passed into the combineReducers call-are going represent the keys that exist inside our state object
