import express from "express";
import Routers from "./files/routes/routes.js";
import RoutersAuth from './files/routes/routesAuth.js'
import dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";
const app = express();

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

app.use(cookieParser());



// making connnection with our database
///////////const MONGODB_URL=process.env.mongodb;
///////////mongoose.connect(MONGODB_URL);


/********Connection with Db */
const port =9090;

const connectDB=async()=>{
    const dbName = "Blog3w";
    const url = `mongodb+srv://admin:0000@cluster0.n3v3sd3.mongodb.net/Blog3w?retryWrites=true&w=majority`;
    const cnx= await mongoose.connect(url);
    console.log(`DBName:${dbName}`);
    console.log(`url:${url}`);
}
connectDB();
/************************** */

app.use(bodyParser.urlencoded({ extended: true }));
// indice pour pointer sur le dossier public pour les fichiers
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "files/views");


app.listen(port, () => {
  console.log(`listning port http://localhost:${port}`);
});

app.use(RoutersAuth);
app.use(Routers);

