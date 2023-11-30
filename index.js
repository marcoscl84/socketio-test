var express = require("express");
var app = express();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

app.set("view engine" , "ejs");

app.get("/", (req, res) => {
    res.render("index")
})

io.on("connection", (socket) => {

    socket.on("disconnect", () => {
        console.log("desconectou: " + socket.id)
    })

    socket.on("msg", (data) => {
        // socket.broadcast.emit("showMsg", data); // envia para todos, menos para o emissor
        io.emit("showMsg", data); // envia para todos, INCLUSIVE para o emissor
        console.log(data);
    })
})

http.listen(3000, () => {
    console.log("App rodando.")
})