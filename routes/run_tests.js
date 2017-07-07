var router = require('express').Router();

router.post("/", function(req, res) {
  // Close the connection right away
  res.send({ status: "running" });
});

module.exports = router;
