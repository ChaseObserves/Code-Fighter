import { START_FIGHT } from "../actions/types";

// This auth reducer stores the list of logged in fighters

export default function(state = null, action) {
  switch (action.type) {
    case START_FIGHT:
      return action.payload;
    default:
      return state;
  }
}
