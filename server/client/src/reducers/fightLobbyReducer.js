import { CREATE_LOBBY } from "../actions/types";

// This auth reducer stores the list of logged in fighters

export default function(state = [], action) {
  switch (action.type) {
    case CREATE_LOBBY:
      return action.payload;
    default:
      return state;
  }
}
