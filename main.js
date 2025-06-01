import { updateHomePageUI } from "./assets/utility/todos.js";

function initApp(){
  window.location.pathname.includes("index.html") ? updateHomePageUI() : window.location.href = "login.html";
}

window.logoutUser =  function() {
  localStorage.removeItem("currentUser");
  window.location.href = "./login.html";
}


document.addEventListener("DOMContentLoaded",initApp())








