const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [{"username":"Urooj","password":"123"}];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
let userswithsamename = users.filter((user)=>{
    return user.username === username
  });
  if(userswithsamename.length > 0){
    return true;
  } else {
    return false;
  }}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
let authenticated_user=users.filter((user)=>{
    return (user.username === username && user.password === password);
});
if(authenticated_user.length > 0)
    return true;
    else 
    return false;}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const username=req.body.username;
  const password= req.body.password;
  if (!username || !password)
  return res.status(300).json({message: "Error! empty username or password"});
  if (authenticatedUser(username,password)){
    let accessToken = jwt.sign({
        data: password
      }, 'access', { expiresIn: 60 * 60 });
  
      req.session.authorization = {
        accessToken,username
    }
    return res.status(200).send("User successfully logged in");
    } else {
      return res.status(208).json({message: "Invalid Login. Check username and password"});
    }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const isbn = req.params.isbn;
  const review = req.query.review;
  const username = req.session.authorization.username;
  const book=books[isbn];
  if(book){
     if (book.reviews[username] && book.review[username].value!=review){
         book.reviews.username=review;
     }
     else{book.reviews[username]=review;}
     return res.status(208).send(`Review book with isbn ${isbn} addeed/updated.`);
    }
    else{
        return res.status(408).send(` ${isbn} unavailable.`);
    }
  
  return res.status(300).json({message: "Yet to be implemented"});
});
regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const username = req.session.authorization.username;
    const book=books[isbn];
    if (book && book.reviews[username]){
        delete book.reviews[username];
        return res.status(208).send(`Review of user ${username} for book with isbn ${isbn} deleted.`);}
        return res.status(300).send("To be implemented");
});
module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
