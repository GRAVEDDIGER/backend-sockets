const userName = prompt("Ingrese su email");
const sendButton = document.getElementById("sendButton");
const inputBox = document.getElementById("textBox");
const textBox = document.querySelector(".texto");

function clientMessage(mensaje, client) {
  const textContainer = document.createElement("div");
  if (client === true) {
    textContainer.classList.add("textContainerClient");
  } else textContainer.classList.add("textContainerServer");
  user = document.createElement("p");
  user.classList.add("user");
  timeStampElement = document.createElement("p");
  timeStampElement.classList.add("time");
  messageElement = document.createElement("p");
  messageElement.classList.add("mensaje");
  user.innerHTML = mensaje.user + " ";
  timeStampElement.innerHTML = new Date(mensaje.timeStamp).toDateString() + " ";
  messageElement.innerHTML = mensaje.message + " ";
  textContainer.appendChild(user);
  textContainer.appendChild(timeStampElement);
  textContainer.appendChild(messageElement);
  textBox.appendChild(textContainer);
}
sendButton.addEventListener("click", (e) => {
  if (userName.length > 0) {
    const messageObj = {
      timeStamp: Date.now(),
      user: userName,
      message: inputBox.value,
    };
    console.log(messageObj);
    socket.emit("clientMessage", messageObj);
    clientMessage(messageObj, true);
  } else {
    alert("Debe ingresar un mail");
    userName = prompt("Ingrese su email");
  }
});
socket.off("serverMessage").on("serverMessage", (socketMessage) => {
  clientMessage(socketMessage, false);
});
