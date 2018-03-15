import { END_FIGHT } from "../actions/types";

// This auth reducer stores the list of logged in fighters

export default function(state = null, action) {
  console.log("log here", action.type, action.payload);
  switch (action.type) {
    case END_FIGHT:
      return action.payload;
    default:
      return state;
  }
}
