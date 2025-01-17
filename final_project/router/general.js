const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username=req.body.username;
  const password= req.body.password;
   if(users.includes(username)){
      res.send(username +" already exists");
  }
  else if (username == "" || password =="" ){
    res.send("Empty field of username or password");
  }
  else{
    users.push({"username":username,"password":password});
    res.send("The user" + (' ')+ (username) + " Has been added!")
  }
 
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify({books},null,10));
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn=req.params.isbn;
  if(books[isbn]){
  res.send(books[isbn]);}
  else{
  return res.status(300).json({message: "Yet to be implemented"})};
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author=req.params.author;
  let booksbyauthor=[];
  Object.keys(books).forEach(key => {
    Object.values(books[key]).forEach(value => {
        if (value==author){
            let temp_dict={
                "isbn":key,
                "title":books[key].title,
                "reviews":books[key].reviews
            }
            booksbyauthor.push(temp_dict);
        }
    });
  });
  res.send({booksbyauthor});
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title=req.params.title;
  let booksbytitle=[];
  Object.keys(books).forEach(key => {
    Object.values(books[key]).forEach(value => {
        if (value==title){
            let temp_dict={
                "isbn":key,
                "author":books[key].author,
                "reviews":books[key].reviews
            }
            booksbytitle.push(temp_dict);
        }
    });
  });
  res.send({booksbytitle});
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn=req.params.isbn;
  res.send(books[isbn]["reviews"]);
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
