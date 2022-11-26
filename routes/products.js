const express = require("express");
const multer = require("multer");
const routes = express.Router();
const Store = require("../funciones/storage");
const colors = require("colors");
const { writeFile } = require("fs/promises");
const fs = require("fs").promises;
const chatClass = require("../funciones/chatStore");
const chatDb = new chatClass("./chat.json");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, "" + Date.now() + "-" + file.originalname);
  },
});
let upload = multer({ storage: storage });
const dbManager = new Store("./data.json");
routes.use(express.json());
routes.post("/addproduct", upload.single("url"), async (req, res) => {
  const { title, price } = req.body;
  const response = await dbManager.addProduct(
    title,
    "./images/" + req.file.filename,
    price,
    this.version
  );
  res.send(response);
});
let prevId = { timeStamp: 0 };
routes.get("/", async (req, res) => {
  const response = await dbManager.getAll(this.version);
  const io = req.app.get("socketio");
  io.on("connection", (socket) => {
    console.log("WebSockets Conected".blue);
    socket.on("addProduct", async (socket) => {
      await dbManager.addProduct(
        socket.title,
        socket.url,
        socket.price,
        this.version
      );
      io.emit("completed", { completed: true });
    });
    socket.on("clientMessage", (datos) => {
      if (prevId.timeStamp !== datos.timeStamp) {
        console.log("brodcast", datos, socket.id);
        fs.readFile("./chat.json", "utf-8").then((res) => console.log(res));
        // chatDb.addItem(datos);
        socket.broadcast.emit("serverMessage", datos);
        prevId = datos;
      }
    });
  });
  res.render("home", { products: response, contenido: response.length > 0 });
});

module.exports = routes;
