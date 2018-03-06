import { FETCH_FIGHTERS } from "../actions/types";

// This auth reducer stores the list of logged in fighters

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_FIGHTERS:
      return action.payload;
    default:
      return state;
  }
}
