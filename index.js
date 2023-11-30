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
        socket.emit("showMsg", data);
        console.log(data);
    })
})

http.listen(3000, () => {
    console.log("App rodando.")
})