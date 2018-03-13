import { INCOMING_CHALLENGE } from "../actions/types";

export default function(state = null, action) {
  switch (action.type) {
    case INCOMING_CHALLENGE:
      return action.payload;
    default:
      return state;
  }
}
