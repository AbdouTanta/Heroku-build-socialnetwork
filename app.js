const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./Models/connection");
const AuthentificationRoutes = require("./Routes/API/Authentification");
const UserRoutes = require("./Routes/API/User");
var cookieParser = require("cookie-parser");
const chatRoutes = require("./Routes/API/Chat");
const socketIo = require("socket.io");
const cors = require("cors");
const PostsRoute = require("./Routes/API/posts");
const path = require("path");

// set up express app
const app = express();
app.use(express.static(path.join(__dirname, "Client/build")));

app.use(cookieParser());
app.use(express.static("public"));
//use connection to mongodb server
connectDB();
app.use(express.json({ extended: false }));

//Adding CORS
app.use(cors({ credentials: true }));

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//     res.header("Access-Control-Allow-Credentials", "true");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//     );
//     if (req.method === "OPTIONS") {
//         res.header(
//             "Access-Control-Allow-Methods",
//             "PUT, POST , PATCH , DELETE , GET"
//         );
//         return res.status(200).json({});
//     }
//     next();
// });
//initialize routes of API
app.use("/api/", AuthentificationRoutes);
app.use(UserRoutes);
//app.use('/api/users/', AuthentificationRoutes);
app.use("/api/posts/", PostsRoute);
app.use(chatRoutes);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/Client/build/index.html"));
});

//listen for requests
let port = process.env.port || 5000;
const server = app.listen(process.env.port || 5000, function () {
    console.log("now listening for requests" + ` on port ${port}`);
});

//configuration of socket.io
const io = socketIo(server, {
    cors: {
        origin: "*",
    },
});
io.on("connection", (socket) => {
    const id = socket.handshake.query.id;
    socket.join(id);

    socket.on("send-message", (messageData) => {
        socket.broadcast.to(messageData.recipient).emit(
            "receive-message",

            messageData
        );
    });

    // // disconnect is fired when a client leaves the server
    // socket.on("disconnect", () => {
    //     console.log("user disconnected");
    // });
});
