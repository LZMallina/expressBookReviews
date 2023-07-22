const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require("axios").default;
public_users.post("/register", (req,res) => {
  //Write your code here
  
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) {
      users.push({ "username": username, "password": password });
      return res
        .status(200)
        .json({ message: "User successfully registered. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  return res.status(404).json({ message: "Unable to register user." });

});

// Get the book list available in the shop
//async axios implemented

const connectToBooks = (url) => {
  const req = axios.get(url);
  console.log(req);
  req.then(resp => {
    console.log("Connection Success")
    console.log(resp.data);
  })
    .catch(err => {
      console.log("rejected for url" + url)
      console.log(err.toString())
  })
}
connectToBooks("http://localhost:5000/")

public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books, null, 4))
  return res.status(300).json({message: "Yet to be implemented"});

});

// Get book details based on ISBN
//async axios implmented
const connectToISBN = (url) => {
  const req = axios.get(url);
  console.log(req);
  req
    .then((resp) => {
      console.log("Connection Success");
      console.log(resp.data);
    })
    .catch((err) => {
      console.log("rejected for url" + url);
      console.log(err.toString());
    });
};
connectToISBN("http://localhost:5000/isbn/1");


public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  res.send(books[isbn]);
  return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
//async axios
const connectToAuthors = (url) => {
  const req = axios.get(url);
  console.log(req);
  req
    .then((resp) => {
      console.log("Connection Success");
      console.log(resp.data);
    })
    .catch((err) => {
      console.log("rejected for url" + url);
      console.log(err.toString());
    });
};
connectToAuthors("http://localhost:5000/author/Unknown");
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let booklist = [];
  const author = req.params.author;
  
  for (book in books) {
    booklist.push(books[book]);
  }
  let filtered_books = booklist.filter((book) => book.author === author)
  
  if (filtered_books.length > 0) {
    res.send(filtered_books)
  } else {
    res.send("Cannot find the author!");
  }
  
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
// async axios
const connectToTitle = (url) => {
  const req = axios.get(url);
  console.log(req);
  req
    .then((resp) => {
      console.log("Connection Success");
      console.log(resp.data);
    })
    .catch((err) => {
      console.log("rejected for url" + url);
      console.log(err.toString());
    });
};
connectToTitle("http://localhost:5000/title/Fairy tales");
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  let booklist = [];
  const title = req.params.title;

  for (book in books) {
    booklist.push(books[book]);
  }
  let filtered_books = booklist.filter((book) => book.title === title);

  if (filtered_books.length > 0) {
    res.send(filtered_books);
  } else {
    res.send("Cannot find the title!");
  }
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  res.send(books[isbn].reviews);
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
