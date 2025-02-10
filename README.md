Blog App

A simple blog web application built using Node.js, Express, EJS, and CSS. Users can create, view, and search blog posts dynamically.

Features

Create and publish blog posts
View all blog posts with the latest ones appearing at the top
Search for blog posts by title using a search bar with live suggestions
User authentication (email and password stored in a file for now)
Responsive design

Tech Stack

Frontend: HTML, CSS, EJS
Backend: Node.js, Express
storage: File-based storage for user authentication (no database yet)

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
  ├── blog/
  │   ├── search.js
  ├── server.js
  ├── README.md

Installation & Setup

Clone the repository:
git clone https://github.com/your-username/blog-app.git
cd blog-app

Install dependencies:
npm install

Run the server:
node server.js

Open in browser:
Visit http://localhost:3000

Search Functionality
The search bar allows users to find blogs by title.
Blogs are filtered dynamically when typing in the search bar.

Future Enhancements
Add a database (MongoDB/PostgreSQL) for storing blogs and users
Implement user authentication with hashed passwords
Improve UI with better styling and animations

License
This project is open-source and free to use.
