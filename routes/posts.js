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
    var getPost = await Post.findById(req.params.id);

    // ====================
    // uploadedFileOriginal
    // parse uploadedFileOriginal from frontend
    //=========================================
    var uploadedFileOriginalData = req.body.uploadedFileOriginal;
    var uploadedFileOriginal = [];
    var str = "";
    var i = 0;
    for (var i = 0; i < uploadedFileOriginalData.length; i++) {
      if (uploadedFileOriginalData[i] !== " ") {
        str = str + uploadedFileOriginalData[i];
      }
      if (
        uploadedFileOriginalData[i] === " " ||
        i + 1 === uploadedFileOriginalData.length
      ) {
        uploadedFileOriginal.push(str);
        str = "";
      }
    }

    var uploadedFileOriginal2 = [];
    for (var i = 0; i < uploadedFileOriginal.length; i++) {
      // f means filename
      var f = uploadedFileOriginal[i];

      for (var j = 0; j < getPost["uploadedFile"].length; j++) {
        if (f === getPost["uploadedFile"][j]["filename"]) {
          uploadedFileOriginal2.push(getPost["uploadedFile"][j]);
          break;
        }
      }
    }

    // ============
    // uploadedFile
    // ============
    var uploadedFile = [...uploadedFileOriginal2];
    for (var i = 0; i < req.files.length; i++) {
      var obj = {};
      obj["filename"] = req.files[i]["filename"];
      obj["path"] = req.files[i]["path"];
      uploadedFile.push(obj);
    }

    var data = {
      title: req.body.title,
      date: req.body.date,
      readTime: req.body.readTime,
      uploadedFile: uploadedFile,
      description: req.body.description,
      author: getPost["author"],
    };

    await Post.findByIdAndUpdate(req.params.id, data);
    return res.json("Post updated");
  }
);

// ================
// /post/delete/:id
// ================
router.get("/post/delete/:id", async function (req, res) {
  await Post.findByIdAndDelete(req.params.id);

  res.json("Post deleted");
});

// =======
// exports
// =======
module.exports = router;
