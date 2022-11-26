const express = require("express");
const handlebars = require("express-handlebars");
const routes = require("./routes/products");
const app = express();
const server = app.listen(8080, () => console.log("Server Up on port 8080"));
const io = require("socket.io")(server);

app.use(express.static("public"));
app.use(express.json());
app.use("/", routes);
app.engine("handlebars", handlebars.engine());
app.set("views", "./views");
app.set("view engine", "handlebars");
app.set("socketio", io);
//app.get("/", (req, res) => res.render("home"));
