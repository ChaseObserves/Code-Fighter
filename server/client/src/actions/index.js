import axios from "axios"; // used to make AJX requests
import {
  FETCH_USER,
  FETCH_FIGHTERS,
  INCOMING_CHALLENGE,
  END_FIGHT
} from "./types"; // In small applications, it's okay to define the action type inline. But for larger apps, best practice is to define them in a separate file as done here.

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

// fetchFighters listens for the "update users" event that gets called when other users are "ready" for a challenge
export const fetchFighters = socket => dispatch => {
  socket.on("update users", data => {
    dispatch({ type: FETCH_FIGHTERS, payload: data });
  });
};

// incomingChallenge gets a challenge from the websocket if another user sends us one
export const incomingChallenge = socket => dispatch => {
  socket.on("challenge", data => {
    console.log("incoming challenge", data);
    dispatch({ type: INCOMING_CHALLENGE, payload: data });
  });
};

export const endFight = fightId => async dispatch => {
  console.log("ending fight", fightId);
  const res = await axios.post("/api/fights/" + fightId, fightId);
  dispatch({ type: END_FIGHT, payload: res.data });
};

//////////////////////////////////////////////////////////////////
