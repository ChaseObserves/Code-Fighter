import axios from "axios"; // used to make AJX requests
import { FETCH_USER, FETCH_FIGHTERS, INCOMING_CHALLENGE } from "./types"; // In small applications, it's okay to define the action type inline. But for larger apps, best practice is to define them in a separate file as done here.

// ---------------- These are Action Creators ----------------
// Action Creators are functions called by React Components and they create/return Actions which are the ONLY source of info for the Redux store.
// Actions are JavaScript objects with a type property (required) and sometimes a payload of data (optional) coming from an API. Actions get sent to Reducers.
// With the Redux Thunk middleware in place, Action Creators no longer have to immediately return an action. Instead, they ~produce~ Actions and then pass them into the Dispatch Function.
// The Dispatch Function already runs automatically behind the scenes in vanilla Redux, but including the Redux Thunk middleware brings it to the surface and gives us a handle on it.
// This allows us to manually Dispatch an action at any moment we want from an Action Creator, rather than requiring us to just flat out "return" it from the Action Creator.
// The Dispatch Function belongs to the Redux store. If we call the Dispatch Function with an Action, that Action will be automatically forwarded on to all the reducers in the app.
// Reducers receive the Actions and produce new values for state, then update those values in the Redux store, and the store sends the new state back to the React Components, causing them to rerender.

// This Action Creator makes a get request to our API then communicates to our authReducer whether or not the user is logged in.
// It's called the moment our app boots up and will affect what displays on the Header Component.
// Redux Thunk, under the hood, inspects whatever value we return from this Action Creator. If it sees that it returns a function instead of a normal Action (which in this case it does, it will automatically call the function and pass in the Dispatch Function as an argument
// The reason we do all of this is so we can dispatch the Action AFTER the GET request has been successfully completed. We don't want to dispatch the Action until after the API response has come back.
export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
  // Axios makes a "get" request for our current user route and the response is a json object with the current users credentials.
  // After it comes back, we "then" take the response, and dispatch it like a normal Action with a "type" (FETCH_USER) and a "payload" (the response from the API)
};
// When the function only returns one JavaScript expression, we can eliminate the "return" statement and curly brackets surrounding the function, see above. No curly brackets after the fetchUser arrow function and no return statement before "async"

// This is what the above Action Creator might've looked like if we weren't using the Redux Thunk middleware
// const fetchUser = () => {
//     const request = axios.get('/api/current_user');

//     return {
//         type: FETCH_USER,
//         payload: request
//     };
// };

// fetchFighters listens for the "update users" event that gets called when other users are "ready" for a challenge
export const fetchFighters = (socket) => async dispatch => {
  // const res = await axios.get("/api/all_users");

    socket.on("update users", (data) => {
      dispatch({ type: FETCH_FIGHTERS, payload: data });
    });

};

// incomingChallenge gets a challenge from the websocket if another user sends us one
export const incomingChallenge = (socket) => async dispatch => {
  socket.on("challenge", (data) => {
    console.log("incoming challenge", data);
    dispatch({type: INCOMING_CHALLENGE, payload: data});
  })

};

//////////////////////////////////////////////////////////////////
