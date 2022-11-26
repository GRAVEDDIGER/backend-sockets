const userName = prompt("Nombre de usuario");
const sendButton = document.getElementById("sendButton");
const inputBox = document.getElementById("textBox");
const textBox = document.querySelector(".texto");
sendButton.addEventListener("click", (e) => {
  socket.emit("sendMessage", {
    timeStamp: Date.now(),
    user: userName,
    message: inputBox.value,
  });
});
socket.on("messageRecived", (socketMessage) => {
  textBox.innerHTML += `[${socketMessage.user}]: ${socketMessage.message}`;
});
