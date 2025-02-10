import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import path from "path";
import moment from "moment";
import fs from "fs";


const app = express();
const port = process.env.port || 3000;

app.use(cors());
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());


const BLOGS_FILE = "blogs.json"; 

const loadBlogs = () =>{
  try{
    const data = fs.readFileSync(BLOGS_FILE, "utf8");
    return JSON.parse(data);
  }catch(err){
    return [];
  }
}

const saveBlogs = (blogs) =>{
  fs.writeFileSync(BLOGS_FILE, JSON.stringify(blogs, null, 2), "utf8");
}

let blogs = loadBlogs();

app.get("/", (req, res) => {
  const formattedBlogs = blogs.map(blog => ({
      ...blog,
      timeAgo: moment(blog.createdAt).fromNow() // Converts date to "10m ago", "1h ago", etc.
  }));
  
  res.render("index.ejs", { blogs: formattedBlogs }); 
});


app.get("/write", (req, res) => {
    res.render("write", { blogs: null });
});


app.post("/add-blog", (req, res) => {
  const { id, title, email, name,  password, content } = req.body;

  if (title && content) {
      if (id) {
          const blogIndex = blogs.findIndex(b => b.id == id && b.email === email && b.password === password);
          if (blogIndex !== -1) {
              blogs[blogIndex].title = title;
              blogs[blogIndex].content = content;
          } else {
              return res.send("Authentication failed or blog not found!");
          }
      } else {
        const newBlog = {
          id: Date.now(), 
          title, 
          email, 
          name, 
          password, 
          content, 
          createdAt: new Date().toISOString() 
        };
        blogs.push(newBlog);
      }
      saveBlogs(blogs);
  }
  res.redirect("/");
});


app.get("/read/:id", (req, res) => {
  const blog = blogs.find(b => b.id == req.params.id);
  if (!blog) return res.redirect("/");
  res.render("read.ejs", { blog });
});


app.post("/edit-blog", (req, res) => {
  const { id, email, password } = req.body;
  const blog = blogs.find(b => b.id == id && b.email === email && b.password === password);
  
  if (!blog) return res.send("Authentication failed!");

  res.render("write.ejs", { blog }); 
});



app.post("/delete-blog", (req, res) => {
  const { id, email, password } = req.body;
  const blogIndex = blogs.findIndex(b => b.id == id && b.email === email && b.password === password);
  
  if (blogIndex === -1) return res.send("Authentication failed!");
  
  blogs.splice(blogIndex, 1);
  saveBlogs(blogs);
  res.redirect("/");
});


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
