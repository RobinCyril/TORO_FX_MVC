import { connectDB } from './model/database.js';
import express from "express";
import { app } from './app.js';
import http from 'http';
const server=http.createServer(app);
import bodyParser from 'body-parser';
import router from './routers/user.js';
import path from 'path';
import passport from 'passport';
import expresSession from 'express-session';
import { Server } from "socket.io"; // Import the Server class from socket.io
import('./passport-setup.js');

// Middleware order: bodyParser, static, express-session, passport
app.use(bodyParser.urlencoded({ extended: false }));    
app.use(express.json());

// Determine the current working directory and construct the path to the "assets" directory
const currentWorkingDirectory = process.cwd();
const staticPath = path.join(currentWorkingDirectory, 'assets');
// console.log('Static path:', staticPath);
app.use(express.static(staticPath));

// Create a new Server instance with the http server
// const io = new Server(http, {
//   cors: {
//     origin: "*",
//   },
// });

connectDB(); // Database connection function

app.use(expresSession({
    secret: 'HiIamRobinthewebdevelooperinappsimagica',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 600000 }
}));



// const __dirname = path.dirname(new URL(import.meta.url).pathname);
// console.log(__dirname)
// app.set("views", path.join(__dirname, "views"));

// Passport middleware should be used after express-session
app.use(passport.initialize());
app.use(passport.session());

// Initialize Passport strategies (passportConfig.js)
import { initializingPassport } from "./passportConfig.js";
initializingPassport(passport); 



app.use('/', router);

server.listen(4000, () => console.log(`Server is listening on port ${4000}`));
