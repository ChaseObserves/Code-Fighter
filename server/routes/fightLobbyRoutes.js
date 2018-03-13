const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

const Fight = mongoose.model("fights");

module.exports = app => {
  app.get("/api/fights", async (req, res) => {
    const fights = await Fight.find({});

    res.send(fights);
  });

  app.post("/api/fights/:fightId", async (req, res) => {
    // create fight with winner if it doesn't exist
    //

    console.log("fightId", fightId);
    console.log("potentialWinner", potentialWinner);

    // const fights = await Fight.find({});

    res.send(fights);
  });
};
