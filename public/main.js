const usuario = prompt("Nombre de usuario");
const addProductForm = document.getElementById("addProductForm");
const handleSubmit = async (e, form) => {
  e.preventDefault();
  const formData = new FormData(form);
  let obj = {};

  formData.forEach((value, key) => (obj[key] = value));
  socket.emit("addProduct", obj);

  // console.log(obj, formData);
  // let headers = new Headers();
  // headers.append("Accept", "application/json");
  // //   headers.append("Content-Type", "application/json");

  // const response = await fetch("/addproduct", {
  //   method: "POST",
  //   headers,
  //   body: formData,
  // });
  // console.log(await response.json());
};
addProductForm.addEventListener("submit", (e) =>
  handleSubmit(e, addProductForm)
);
socket.on("completed", (socketIo) => {
  location.reload();
  console.log("Reseteado");
});
