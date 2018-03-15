import axios from "axios"; // used to make AJX requests
import {
  FETCH_USER,
  FETCH_FIGHTERS,
  INCOMING_CHALLENGE,
  START_FIGHT,
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
  console.log("This is res.data", res.data);
  dispatch({ type: END_FIGHT, payload: res.data });
};

// startFight gets called when a challenge has been issued and accepted
export const startFight = socket => async dispatch => {
  socket.on("start fight", data => {
    console.log("start fight", data);
    dispatch({ type: START_FIGHT, payload: data });
  });
};

//////////////////////////////////////////////////////////////////
