const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

const Fight = mongoose.model("fights");

module.exports = app => {
  app.get("/api/fights", async (req, res) => {
    const fights = await Fight.find({});

    res.send(fights);
  });

  app.post("/api/fights/:fightId", requireLogin, async (req, res) => {
    // create fight with winner if it doesn't exist
    //
    const fightId = req.params.fightId;
    console.log("fightId", fightId);
    const potentialWinner = req.user._id;
    console.log("potentialWinner", potentialWinner);

    try {
      const fights = await Fight.findOne({ fightId });
      console.log("FIGHTS", fights);
      if (fights === null) {
        await Fight.create({ fightId, winner: req.user._id });
        res.json({
          won: true
        });
      } else {
        res.json({
          won: false
        });
      }
    } catch (err) {
      if (err) {
        console.log("Error:", err);
      }
    }
  });
};
