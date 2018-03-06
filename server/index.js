const express = require("express");
const http = require("http");
const axios = require("axios");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/keys");
const socketIO = require("socket.io");
require("./models/User"); // This require statement MUST be above the one below. This defines the user model.
require("./services/passport"); // and this makes use of the user model. You have to define it before you can use it.

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Anything with a request body (POST request, etc) comes into our application, this middleware will parse it, and assign it to the req.body property of the incoming request object

// Call app.use which is a function, pass cookieSession to it, call cookieSession, and provide a configuration
// object. This wires cookies up into the app, and the two statements below this one tell our app to use cookies
// for authentication.
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //This is 30 days in milliseconds. This is how long the cookie lasts in the browser
    keys: [keys.cookieKey]
  })
);

// These statements tell PassportJS to use cookies for authentication.
app.use(passport.initialize());
app.use(passport.session());

// This syntax on line 40 looks weird, right? It's actually perfectly valid JS.
// Instead of creating a variable at the top called 'authRoutes' and setting it
// equal to 'require('.routes/authRoutes')' and then calling authRoutes() down here
// and passing in the 'app' variable from express, we're just eliminating that superfluous
// authRoutes variable altogether, and bringing the require statement down where we would've
// called the function. We can do this because '.routes/authRoutes' _is_ a function
// that's being exported. The second set of parantheses just includes the argument
// that's being passed into that function.
require("./routes/authRoutes")(app);
require("./routes/fighterRoutes")(app);

/////////////////////////////////////////////////////////////////////////////////////////////

// THIS CODE IS ONLY RUN IN PRODUCTION, WHEN THE APP IS FUNCTIONING WITHIN HEROKU. IT IS NECESSARY TO MAKE OUR APP FUNCTION IN HEROKU.
if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets like main.js and main.css. Order of operations, this will execute first.
  app.use(express.static("client/build")); // If Express does not understand the route that's being requested, look inside the client/build directory and see if there is a file in there with a route defined that matches the request

  // Express will serve up the index.html file if it doesn't recognize the route. Will run this as a last resort if the first search in build/client yields no results.
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

/////////////////////////////////////////////////////////////////////////////////////////////

const PORT = process.env.PORT || 5000;

//////////////////////////////////////////////////////////////////
// ATTEMPTING SOCKET.IO INTEGRATION
const server = http.createServer(app);
const io = socketIO(server);

let connections = [];
let users = {};

function updateUsers(io) {
  var usersArray = [];
  for (var userId in users) {
    usersArray.push(users[userId]);
  }

  io.sockets.emit("update users", usersArray);
  socket.emit("update users", usersArray);
}

io.on("connection", socket => {
  // keep track of new connections 
  connections.push(socket);
  console.log(
    `${socket.id} connected: ${connections.length} active connections.`
  );

  // send a debug log to clients to let them know a new connection happened
  io.sockets.emit("message", `a new connection happened ${socket.id}`);

  // debug event for logging messages sent from clients
  socket.on("message", function(data){
    console.log("message", data);
  });

  // on disconnects we need to remove the user that disconnected from our users array
  socket.on("disconnect", function(data) {
    connections.splice(connections.indexOf(socket), 1);
    for (var userId in users) {
      if (users[userId].socketId == socket.id) {
        delete(users[userId]);
        break;
      }
    }
    console.log(
      `Connection disconnected: ${connections.length} active connections.`
    );

    updateUsers(io);
  });

  // ready will be called by clients when they can accept a new challenge--the data coming in is the user object
  socket.on("ready", function(user) {
    user.socketId = socket.id;
    users[user._id] = user;

    updateUsers(io);
  });

  // challenge is called when User A clicks "Fight" on User B's fighter card. User B can then accept the challenge and they will be taken to /fight/:fightID
  socket.on("challenge", function(challengeDetails) {
    // get the challenger ID and challenged ID so we can send the event to the challenged user
    var challenger = challengeDetails.challenger._id;
    var challenged = users[challengeDetails.challenged];

    // if we couldn't find the challenger or the challenged in our users object then we have a problem
    if (!challenger || !challenged) {
      console.log("problem with challenger or challenged");
      return
    }

    console.log(`${challenger} vs ${challenged._id}`);

    // let the challenged user know they need to accept this challenge
    socket.broadcast.to(challenged.socketId).emit("challenge", data);
  });

  // accept challenge will be called after a challenge has been sent to a user and the challenged user has accepted it. 
  // We will send a websocket event to both clients with the ID for a fight and the client will jump to /fight/:fightID
  socket.on("accept challenge", function(data) {
    var fightId = "12345";
    var otherUser = users[data.challenger];

    if (!otherUser) {
      console.log("problem finding original challenger user");
      return
    }

    // useful info about rooms if you want to add some real time stuff to the fight later.
    // https://stackoverflow.com/questions/35680565/sending-message-to-specific-client-in-socket-io/35681189

    // for now, just create a `fight` record in the db and return the _id to both clients.

    // you're client code will be need to be listening for a "start fight" event--when it happens, go to /fight/:fightId

    // send the fightId to both users on the "start fight" event
    socket.broadcast.to(otherUser.socketId).emit("start fight", fightId);
    socket.emit("start fight", fightId);

  });

});

server.listen(PORT, function() {
  console.log("App listening on port " + PORT);
});
