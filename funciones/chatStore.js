const fs = require("fs").promises;
const fsSync = require("fs");
class ChatHistory {
  constructor(file) {
    this.chat = [];
    this.file = file;
  }
  readData() {
    if (fsSync.existsSync(this.file)) {
      fs.readFile(this.file).then((res) => {
        this.chat = res;

        console.log(res, "response");
      });
    }
  }
  lastId(datos) {
    return Math.max(datos.map((item) => item.id)) || 0;
  }
  saveFile() {
    fs.writeFile(this.file, this.chat, "utf-8");
  }
  addItem() {
    this.readData().then((res) => {
      nextId = this.lastId(res) + 1;
      objDatos = { ...res, nextId };
      this.chat.push(objDatos);
      this.saveFile();
    });
  }
}

module.exports = ChatHistory;
