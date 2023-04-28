import AsyncHandler from "express-async-handler"
import Articles from "../models/articlesModel.js";
import User from '../models/userModel.js'
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcryptjs";
const salt = 10;
let token;


// get our urls and secrets
const JWT_SECRET=process.env.jwt;


const getSignup = AsyncHandler(async (req, res) => {
  res.render("register");
});

const getSignin = AsyncHandler(async (req, res) => {
  res.render("login");
});

// signup user in data base  
const signup = AsyncHandler(async (req, res) => {
  // geting our data from frontend
  const { email, password: plainTextPassword } = req.body;
  // encrypting our password to store in database
  const password = await bcrypt.hash(plainTextPassword, salt);
  let mailexist = await User.findOne({ email });
  if (!mailexist) {
    // storing our user data into database
    const client = new User({
      email,
      password,
    });
    await client.save();
    res.redirect("/articles");
  } else {
    res.json("mail existant");
  }
});



const verifyUserLogin = AsyncHandler(async (email, password) => {
  const user = await User.findOne({ email }).lean();
  const verifyPassword = await bcrypt.compare(password, user.password);

  if (!user) {
    //res.send("user not found");
    return "user not found";
  } else {
    if (verifyPassword) {
      // Créer JWT token
       token = jwt.sign(
        { id: user._id, username: user.email, type: "user" },
        JWT_SECRET
      );
      return "ok";
    } else {
      return "invalid password";
    }
  }
});


 
const signin = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // we made a function to verify our user login
  const response = await verifyUserLogin(email, password);
  if (response === "ok") {
    // storing our JWT web token as a cookie in our browser
    res.cookie("token", token, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true }); // maxAge: 2 hours
    res.redirect("/articles");
  } else {
    res.json(response);
  }
});



const verifyToken = (token) => {
  try {
    const verify = jwt.verify(token, JWT_SECRET);
    if (verify.type === "user") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(JSON.stringify(error), "error");
    return false;
  }
};

// vérifier le token avant d'entrer dans la page qui demande l'authentification 


const showArticlesAdmin = AsyncHandler(async (req, res) => {
  const { token } = req.cookies;
   const articles = await Articles.find().populate("category").sort({ title: 1 });

  if (verifyToken(token)) {

    res.render("listeArticles", { articles: articles });
  } else {
    res.redirect("/signup");
  }
});


  const logout = AsyncHandler (async(req, res)=>{
    res.clearCookie("token");
     res.redirect("/");
  })


export { 
    getSignup,
    getSignin,
    signup,
    signin,
    showArticlesAdmin,
    logout, 
    };