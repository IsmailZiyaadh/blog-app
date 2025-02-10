import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import path from "path";


const app = express();
const port = process.env. port || 3000;

app.use(cors());
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());


let blogs = []; 

app.get("/", (req, res) => {
    res.render("index.ejs", { blogs }); 
});

app.get("/write", (req, res) => {
    res.render("write", { blogs: null });
});


app.post("/add-blog", (req, res) => {
  const { id, title, email, password, content } = req.body;

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
          blogs.push({ id: Date.now(), title, email, password, content, createdAt: new Date().toISOString()  });
      }
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
  res.redirect("/");
});


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
