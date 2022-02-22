var mongoose = require("mongoose");

// Register
var commentSchema = new mongoose.Schema({
  postId: String,
  comments: [],
});
var Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
