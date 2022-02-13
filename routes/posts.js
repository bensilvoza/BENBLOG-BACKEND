var express = require("express");
var router = express.Router();
var Post = require("../models/post");
var { storage } = require("../cloudinary");
var multer = require("multer");
var upload = multer({ storage });

// ============
// /
// root address
// ============
router.get("/", async function (req, res) {
  var getPosts = await Post.find({});
  res.json(getPosts);
});

// =============
// /posts/create
// =============
router.get("/posts/create", async function (req, res) {
  res.json("");
});

router.post(
  "/posts/create",
  upload.array("uploadedFile"),
  async function (req, res) {
    var uploadedFileData = [];
    for (var i = 0; i < req.files.length; i++) {
      uploadedFileData.push({
        filename: req.files[i]["filename"],
        path: req.files[i]["path"],
      });
    }

    var data = new Post({
      title: req.body.title,
      date: req.body.date,
      readTime: req.body.readTime,
      description: req.body.description,
      uploadedFile: uploadedFileData,
      author: req.body.author,
    });

    await data.save();
    res.json("Post created");
  }
);

// =========
// /post/:id
// =========
router.get("/post/:id", async function (req, res) {
  var getPost = await Post.findById(req.params.id);

  res.json(getPost);
});

// ==============
// /post/edit/:id
// ==============
router.get("/post/edit/:id", async function (req, res) {
  var getPost = await Post.findById(req.params.id);

  res.json(getPost);
});

router.post(
  "/post/edit/:id",
  upload.array("uploadedFile"),
  async function (req, res) {
    console.log(req.body);
    console.log(".");
    console.log(".");
    console.log(".");
    console.log(req.files);
  }
);

// =======
// exports
// =======
module.exports = router;
