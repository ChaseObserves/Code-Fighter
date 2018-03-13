import axios from "axios"; // used to make AJX requests
import {
  FETCH_USER,
  FETCH_FIGHTERS,
  INCOMING_CHALLENGE,
  CREATE_LOBBY
} from "./types"; // In small applications, it's okay to define the action type inline. But for larger apps, best practice is to define them in a separate file as done here.

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

// fetchFighters listens for the "update users" event that gets called when other users are "ready" for a challenge
export const fetchFighters = socket => async dispatch => {
  // const res = await axios.get("/api/all_users");

  socket.on("update users", data => {
    dispatch({ type: FETCH_FIGHTERS, payload: data });
  });
};

// incomingChallenge gets a challenge from the websocket if another user sends us one
export const incomingChallenge = socket => async dispatch => {
  socket.on("challenge", data => {
    console.log("incoming challenge", data);
    dispatch({ type: INCOMING_CHALLENGE, payload: data });
  });
};

export const createFightLobby = somethingElseGoesHere => async dispatch => {
  const res = await axios.post("/fights", somethingElseGoesHere);
  dispatch({ type: CREATE_LOBBY, payload: res.data });
};

//////////////////////////////////////////////////////////////////
