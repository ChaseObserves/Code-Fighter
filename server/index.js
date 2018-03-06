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
let users = [];

// const getCurrentUserAndEmit = async socket => {
//   try {
//     const res = await axios.get("/api/current_user");
//     socket.emit("FromDB", res.data.id);
//   } catch (error) {
//     console.error("Error: ${error.code");
//   }
// };

io.on("connection", socket => {
  connections.push(socket);
  console.log(
    `${socket.id} connected: ${connections.length} active connections.`
  );
  // getCurrentUserAndEmit(socket);
  socket.on("disconnect", function(data) {
    connections.splice(connections.indexOf(socket), 1);
    for (var i = 0; i < users.length; i++) {
      if (users[i].id == socket.id) {
        users.splice(i, 1);
        break;
      }
    }
    console.log(
      `Connection disconnected: ${connections.length} active connections.`
    );
    io.sockets.emit("update users", { users: users });
    if (!connections.length) {
      messages = [];
    }
  });

  socket.on("login", function(data) {
    users.push({
      name: data,
      id: socket.id
    });
    socket.emit("logged in", {
      loggedIn: true,
      currentUser: data,
      history: messages
    });
    io.sockets.emit("update users", { users: users });
    socket.emit("update users", { users: users });
  });
});

server.listen(PORT, function() {
  console.log("App listening on port " + PORT);
});
