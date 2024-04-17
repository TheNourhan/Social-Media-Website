require('dotenv').config();
const express = require('express');
const app =express();
const middleware =require('./middlewares/require-login');
const bodyParser =require("body-parser");
const database =require("./models/conn-db");
const session = require("express-session");
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'Client', 'src')));
/*
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'Client', 'src', 'index.js'));
});
*/
app.use(bodyParser.urlencoded({extended:false}));
const corsOption = {
   origin: "*",
   methods: "GET,HEAD,PUT,PATCH,POST,DELET",
   credential: true,
};
app.use(cors(corsOption));

app.use(session({
   secret:"bbq chips",
   resave: true,
   saveUninitialized:false
}));

//Routes
const user_route =require('./routes/user-route');
app.use("/", user_route);

const country_route = require('./routes/countries-route');
app.use("/api/users", country_route);

const post_route = require('./routes/post-route');
app.use("/api/users/", post_route);

const notification_route = require('./routes/notification-route');
app.use("/api/users/", notification_route);

app.get("/", middleware.requireLogin, (req ,res ,next) => {
   var payload = {
     pageTitle :"Home",
      userLoggedIn: req.session.user,
   }
   res.status(200).render("home",payload);
});

const server = app.listen(process.env.PORT || 3003,() => {
   console.log("server listening on port " + process.env.PORT || 3003);
});

