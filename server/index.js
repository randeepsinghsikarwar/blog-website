const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const user = require("./models/user");
const Post = require("./models/Posts");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const app = express();

const salt = bcrypt.genSaltSync(10);
const secret = "ciio1m2oimosaimdoim4oim1";

const uploadMiddleware = multer({ dest: "uploads/" });
const fs = require("fs");
const { dirname } = require("path");

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'))

mongoose.connect(
  "mongodb+srv://randeeps2000:abc123abc@cluster0.pzutac9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

app.get("/", (req, res) => {
  res.send("working");
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await user.create({
      username,
      password: bcrypt.hashSync(password, salt),
      // password
    });
    res.json(userDoc);
  } catch (e) {
    res.status(400).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const userDoc = await user.findOne({ username });
  const passCheck = bcrypt.compareSync(password, userDoc.password);

  if (passCheck) {
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json("ok");
    });
  } else {
    res.status(400).json("wrong cred");
  }
});

app.get("/validate", (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  jwt.verify(token, secret, (err, info) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }

    res.json(info);
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.post("/createPost", uploadMiddleware.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'File not uploaded' });
    }

    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const extension = parts[parts.length - 1];
    const newName = path + '.' + extension;
    fs.renameSync(path, newName);

    const { token } = req.cookies;
    jwt.verify(token, secret, async (err, info) => {
      if (err) {
        return res.status(403).json({ error: 'Invalid token' });
      }

      const { title, summary, content } = req.body;
      const postDoc = await Post.create({
        title,
        summary,
        content,
        image: newName,
        author: info.id
      });

      res.status(201).json(postDoc);
    });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/createPost', async (req, res) => {
  res.json(await Post.find().populate('author', ['username']).sort({createdAt: -1}));
});

app.get('/createPost/:id', async (req, res) => {
  const {id} = req.params;
  const postDoc = await Post.findById(id).populate('author', ['username'])
  res.json(postDoc)
})

app.put('/createPost', uploadMiddleware.single('file'), async (req,res) => {
  let newPath = null;
  if (req.file) {
    const {originalname, path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    newPath = path + '.' + ext;
    fs.renameSync(path, newPath);
  }

  const {token} = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const {id, title, summary, content} = req.body;
    const postDoc = await Post.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      return res.status(400).json('you are not the author');
    }

    postDoc.title = title;
    postDoc.summary = summary;
    postDoc.content = content;
    if (newPath) {
      postDoc.cover = newPath;
    }
    await postDoc.save();

    res.json(postDoc);
  });

});

app.listen(4000);

//  mongodb+srv://randeeps2000:abc123abc@cluster0.pzutac9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// pass: abc123abc
