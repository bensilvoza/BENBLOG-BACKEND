var mongoose = require("mongoose");

// Post
var postSchema = new mongoose.Schema({
  title: String,
  date: String,
  readTime: String,
  description: String,
  uploadedFile: [],
  author: String,
});
var Post = mongoose.model("Post", postSchema);

module.exports = Post;
