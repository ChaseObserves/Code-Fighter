import { combineReducers } from "redux";
import authReducer from "./authReducer";
import fightersReducer from "./fightersReducer";
import challengeReducer from "./challengeReducer";
import startFightReducer from "./startFightReducer";

export default combineReducers({
  auth: authReducer,
  fighters: fightersReducer,
  challenge: challengeReducer,
  acceptedFight: startFightReducer
});

// Whatever keys we provide to this object-the one being passed into the combineReducers call-are going represent the keys that exist inside our state object
