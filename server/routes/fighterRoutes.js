const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

const User = mongoose.model("users");

module.exports = app => {
  app.get("/api/all_users", async (req, res) => {
    const fighters = await User.find({});

    res.send(fighters);
  });
};
