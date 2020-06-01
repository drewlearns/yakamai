var express = require("express");
var router = express.Router();

/* Handle a GET request to the subdirectory root.*/
router.get("/", function (req, res, next) {
  res.render("groups", {
    title: "List of Akamai Property Manager Groups",
    data: ["Group1", "Group2", "Group3"],
  });
});

module.exports = router;
