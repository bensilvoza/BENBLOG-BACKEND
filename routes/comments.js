var express = require("express");
var router = express.Router();
var Comment = require("../models/comment");

// =============
// /createupdate
// =============
router.get("/comment/:commentId", async function (req, res) {
  var find = await Comment.findOne({ postId: req.params.commentId });

  if (find === null) {
    res.json([]);
  } else {
    res.json(find["comments"]);
  }
});

router.post("/comment/createupdate", async function (req, res) {
  var find = await Comment.findOne({ postId: req.body.postId });

  if (find === null) {
    var data = new Comment(req.body);
    await data.save();
    return res.json("comment created");
  } else {
    await Comment.findOneAndUpdate({ postId: req.body.postId }, req.body);
    return res.json("comment updated");
  }
});

// =======
// exports
// =======
module.exports = router;
