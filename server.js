import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import path from "path";
import moment from "moment";
import mongoose from "mongoose";
import 'dotenv/config'

const app = express();
const port = process.env.PORT || 3000;

mongoose.set("strictQuery", true);


app.use(cors());
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true,
  sslValidate: true
});

const db = mongoose.connection;
db.once("open", () => {
  console.log("MongoDB connection successful");
});


const blogSchema = new mongoose.Schema({
  title: String,
  name: String,
  email: String,
  password: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
});

const Blog = mongoose.model("Blog", blogSchema);


app.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    const formattedBlogs = blogs.map(blog => ({
      ...blog.toObject(),
      timeAgo: moment(blog.createdAt).fromNow(),
    }));

    res.render("index.ejs", { blogs: formattedBlogs });
  } catch (err) {
    console.error("Error fetching blogs:", err);
    res.status(500).send("Error loading blogs.");
  }
});


app.get("/write", (req, res) => {
  res.render("write", { blog: null });
});

// Add or Edit Blog
app.post("/add-blog", async (req, res) => {
  const { id, title, email, name, password, content } = req.body;

  try {
    if (id) {
      const updatedBlog = await Blog.findOneAndUpdate(
        { _id: id, email, password },
        { title, content },
        { new: true }
      );

      if (!updatedBlog) {
        return res.send("Authentication failed or blog not found!");
      }
    } else {
      const newBlog = new Blog({ title, email, name, password, content });
      await newBlog.save();
    }

    res.redirect("/");
  } catch (err) {
    console.error("Error saving blog:", err);
    res.status(500).send("Error saving blog.");
  }
});

// Read Blog Route
app.get("/read/:id", async (req, res) => {
    try {
      console.log("Fetching blog with ID:", req.params.id);
      const blog = await Blog.findById(req.params.id);
      if (!blog) {
        console.log("Blog not found.");
        return res.status(404).send("Blog not found.");
      }
      console.log("Blog found:", blog);
      res.render("read.ejs", { blog });
    } catch (err) {
      console.error("Error fetching blog:", err);
      res.status(500).send("Error loading blog.");
    }
  });
// Edit Blog Route
app.post("/edit-blog", async (req, res) => {
  const { id, email, password } = req.body;

  try {
    const blog = await Blog.findOne({ _id: id, email, password });
    if (!blog) return res.send("Authentication failed!");

    res.render("write.ejs", { blog });
  } catch (err) {
    console.error("Error finding blog:", err);
    res.status(500).send("Error loading blog for editing.");
  }
});

// Delete Blog Route
app.post("/delete-blog", async (req, res) => {
  const { id, email, password } = req.body;

  try {
    const deletedBlog = await Blog.findOneAndDelete({ _id: id, email, password });
    if (!deletedBlog) return res.send("Authentication failed!");

    res.redirect("/");
  } catch (err) {
    console.error("Error deleting blog:", err);
    res.status(500).send("Error deleting blog.");
  }
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
