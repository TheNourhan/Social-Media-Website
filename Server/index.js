require('dotenv').config();
const express = require('express');
const app =express();
const bodyParser =require("body-parser");
const database =require("./models/conn-db");
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const socket = require('./socket/socket');

app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'Client', 'src')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(bodyParser.urlencoded({extended:false}));
const corsOption = {
   origin: "*",
   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
   credential: true,
};
app.use(cors(corsOption));

app.get('/', (req, res) => {
   res.send('Hello Server!')
});

//Routes
const user_route =require('./routes/user-route');
app.use("/", user_route);

const country_route = require('./routes/countries-route');
app.use("/api/users", country_route);

const post_route = require('./routes/post-route');
app.use("/api/users/", post_route);

const notification_route = require('./routes/notification-route');
app.use("/api/users/", notification_route);

const search = require('./routes/search-route');
app.use("/api/search/", search);

const conversation = require('./routes/conversations-route');
app.use("/api/conversations/", conversation);

const message = require('./routes/messages-route');
app.use("/api/messages/", message);

app.listen(process.env.PORT || 3003,() => {
   console.log("server listening on port " + process.env.PORT || 3003);
});

