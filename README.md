Blog App

A simple blog web application built using Node.js, Express, EJS, and CSS. Users can create, view, and search blog posts dynamically.

Features

Create and publish blog posts
View all blog posts with the latest ones appearing at the top
Search for blog posts by title using a search bar with live suggestions
User authentication (email and password stored in a file for now)
Responsive design
Now using MongoDB Atlas for blog storage

Tech Stack

Frontend: CSS, EJS
Backend: Node.js, Express
Database: MongoDB Atlas for storing blog posts (user authentication still file-based)

Folder Structure

/blog
  ├── public/
  │   ├── styles/
  │   │   ├── main.css
  │   ├── images/
  │   │   ├── blog-icon.png
  ├── views/
  │   ├── index.ejs
  │   ├── write.ejs
  │   ├── view.ejs
  │   ├── partials/
  │   │   ├── header.ejs
  │   │   ├── footer.ejs
  ├── server.js
  ├── README.md

Installation & Setup

Clone the repository:
git clone https://github.com/IsmailZiyaadh/blog-app.git
cd blog-app

Install dependencies:
npm install

Set up your MongoDB Atlas connection in .env:
MONGODB_URI=your-mongodb-atlas-connection-string

Run the server:
node server.js

Open in browser:
Visit http://localhost:3000

Search Functionality
The search bar allows users to find blogs by title and by author name as well.
Blogs are filtered dynamically when typing in the search bar.

Future Enhancements
Implement user authentication with hashed passwords
Improve UI with better styling and animations

License
This project is open-source and free to use.
